import React, { useState, useEffect, useMemo } from 'react';
import styles from './Energetic.module.css';
import {
  DadosEnergeticosData,
  RazaoEnergeticaUsina,
  RazaoEnergeticaIntervalo,
  EnergeticFormData,
  gerarIntervalos,
  calcularTotal,
  calcularMedia,
} from '../../../types/energetic';

interface EnergeticProps {
  onLoadData: (formData: EnergeticFormData) => Promise<DadosEnergeticosData | null>;
  onSave: (data: DadosEnergeticosData) => Promise<void>;
}

/**
 * Componente para Coleta de Dados Energéticos (Razão Energética Transformada)
 * 
 * Migrado de: legado/pdpw/frmColEnergetica.aspx
 * 
 * Funcionalidades:
 * - Seleção de Data PDP, Empresa e Usina
 * - Visualização de dados em tabela com 48 intervalos
 * - Edição via textarea (formato tab/enter separated)
 * - Opção de editar usina individual ou todas simultaneamente
 * - Cálculo automático de totais e médias
 */
const Energetic: React.FC<EnergeticProps> = ({ onLoadData, onSave }) => {
  const [formData, setFormData] = useState<EnergeticFormData>({
    dataPdp: '',
    codEmpresa: '',
    codUsina: '',
  });

  const [data, setData] = useState<DadosEnergeticosData | null>(null);
  const [textareaValue, setTextareaValue] = useState<string>('');
  const [showTextarea, setShowTextarea] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  // Dados mockados para demonstração
  const datasPdp = ['', '15/01/2025', '16/01/2025', '17/01/2025'];
  const empresas = [
    { cod: '', nome: '' },
    { cod: 'EMP001', nome: 'Empresa Alpha' },
    { cod: 'EMP002', nome: 'Empresa Beta' },
  ];
  const [usinas, setUsinas] = useState<string[]>([]);

  /**
   * Carrega lista de usinas quando empresa é selecionada
   */
  useEffect(() => {
    if (formData.codEmpresa && formData.dataPdp) {
      // Simula carregamento de usinas
      setUsinas(['UHE001', 'UHE002', 'UHE003']);
    } else {
      setUsinas([]);
    }
  }, [formData.codEmpresa, formData.dataPdp]);

  /**
   * Carrega dados quando empresa é selecionada
   */
  useEffect(() => {
    if (formData.codEmpresa && formData.dataPdp) {
      handleLoadData();
    }
  }, [formData.codEmpresa]);

  /**
   * Carrega dados do servidor
   */
  const handleLoadData = async () => {
    if (!formData.dataPdp || !formData.codEmpresa) return;

    setIsLoading(true);
    setError('');

    try {
      const result = await onLoadData(formData);
      setData(result);
    } catch (err) {
      setError('Não foi possível carregar os dados.');
      console.error('Erro ao carregar dados:', err);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Processa mudança de campo do formulário
   */
  const handleFormChange = (field: keyof EnergeticFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setShowTextarea(false);
    setTextareaValue('');
  };

  /**
   * Quando usina é selecionada, prepara textarea com dados
   */
  useEffect(() => {
    if (formData.codUsina && formData.codUsina !== 'Selecione uma Usina' && data) {
      prepareTextareaData();
      setShowTextarea(true);
    } else {
      setShowTextarea(false);
      setTextareaValue('');
    }
  }, [formData.codUsina, data]);

  /**
   * Prepara dados para o textarea
   * Formato: valores separados por \n (uma usina) ou \t e \n (todas as usinas)
   */
  const prepareTextareaData = () => {
    if (!data) return;

    if (formData.codUsina === 'Todas as Usinas') {
      // Formato: tab-separated para cada intervalo com todas as usinas
      const lines: string[] = [];
      for (let i = 0; i < 48; i++) {
        const valores = data.usinas.map(usina => 
          usina.intervalos[i].valRazaoEnerTran.toString()
        );
        lines.push(valores.join('\t'));
      }
      setTextareaValue(lines.join('\n'));
    } else {
      // Formato: uma linha por intervalo para usina específica
      const usina = data.usinas.find(u => u.codUsina === formData.codUsina);
      if (usina) {
        const valores = usina.intervalos.map(int => int.valRazaoEnerTran.toString());
        setTextareaValue(valores.join('\n'));
      }
    }
  };

  /**
   * Remove ENTERs duplicados ao digitar no textarea
   */
  const handleTextareaKeyUp = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      let value = textareaValue;
      // Remove \t\n seguidos
      value = value.replace(/\t\n/g, '\t');
      // Remove \n\t seguidos
      value = value.replace(/\n\t/g, '\t');
      // Remove \n\n seguidos
      value = value.replace(/\n\n/g, '\n');
      setTextareaValue(value);
    }
  };

  /**
   * Salva dados editados no textarea
   */
  const handleSave = async () => {
    if (!data) return;

    setIsLoading(true);
    setError('');

    try {
      const updatedData = parseTextareaData();
      await onSave(updatedData);
      
      // Recarrega dados após salvar
      await handleLoadData();
      setShowTextarea(false);
      setFormData(prev => ({ ...prev, codUsina: '' }));
    } catch (err) {
      setError('Não foi possível salvar os dados.');
      console.error('Erro ao salvar:', err);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Converte conteúdo do textarea de volta para estrutura de dados
   */
  const parseTextareaData = (): DadosEnergeticosData => {
    if (!data) throw new Error('Dados não carregados');

    const lines = textareaValue.split('\n');
    const newData = { ...data };

    if (formData.codUsina === 'Todas as Usinas') {
      // Parsing para todas as usinas
      lines.forEach((line, intervaloIdx) => {
        if (intervaloIdx < 48) {
          const valores = line.split('\t').map(v => parseFloat(v) || 0);
          valores.forEach((valor, usinaIdx) => {
            if (usinaIdx < newData.usinas.length) {
              newData.usinas[usinaIdx].intervalos[intervaloIdx].valRazaoEnerTran = valor;
            }
          });
        }
      });
    } else {
      // Parsing para usina específica
      const usinaIdx = newData.usinas.findIndex(u => u.codUsina === formData.codUsina);
      if (usinaIdx !== -1) {
        lines.forEach((line, intervaloIdx) => {
          if (intervaloIdx < 48) {
            newData.usinas[usinaIdx].intervalos[intervaloIdx].valRazaoEnerTran = parseFloat(line) || 0;
          }
        });
      }
    }

    // Recalcula totais e médias
    newData.usinas = newData.usinas.map(usina => ({
      ...usina,
      total: calcularTotal(usina.intervalos),
      media: calcularMedia(usina.intervalos),
    }));

    // Recalcula totais por intervalo
    newData.totaisPorIntervalo = newData.totaisPorIntervalo.map((totalInt, idx) => ({
      ...totalInt,
      total: newData.usinas.reduce((sum, usina) => sum + usina.intervalos[idx].valRazaoEnerTran, 0),
    }));

    return newData;
  };

  /**
   * Calcula totais por intervalo (somando todas as usinas)
   */
  const totaisPorIntervalo = useMemo(() => {
    if (!data) return [];
    
    return data.intervalos ? data.totaisPorIntervalo : [];
  }, [data]);

  /**
   * Calcula posição do textarea na tela
   */
  const getTextareaStyle = (): React.CSSProperties => {
    const baseLeft = 154;
    const columnWidth = 64;
    
    if (formData.codUsina === 'Todas as Usinas') {
      return {
        left: `${baseLeft}px`,
        width: `${usinas.length * columnWidth + 16}px`,
      };
    } else {
      const usinaIndex = usinas.indexOf(formData.codUsina);
      return {
        left: `${90 + (usinaIndex + 1) * columnWidth}px`,
        width: '81px',
      };
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.systemTitle}>
          <h2>Sistema de Coleta</h2>
        </div>
        <div className={styles.pageTitle}>
          <h3>Razão Energética Transformada</h3>
        </div>
      </div>

      {error && <div className={styles.errorMessage}>{error}</div>}

      <div className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="dataPdp">
            <strong>Data PDP:</strong>
          </label>
          <select
            id="dataPdp"
            value={formData.dataPdp}
            onChange={e => handleFormChange('dataPdp', e.target.value)}
            className={styles.select}
          >
            {datasPdp.map((data, idx) => (
              <option key={idx} value={data}>
                {data}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="codEmpresa">
            <strong>Empresa:</strong>
          </label>
          <select
            id="codEmpresa"
            value={formData.codEmpresa}
            onChange={e => handleFormChange('codEmpresa', e.target.value)}
            className={styles.select}
          >
            {empresas.map(emp => (
              <option key={emp.cod} value={emp.cod}>
                {emp.nome}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="codUsina">
            <strong>Usinas:</strong>
          </label>
          <select
            id="codUsina"
            value={formData.codUsina}
            onChange={e => handleFormChange('codUsina', e.target.value)}
            className={styles.select}
            disabled={usinas.length === 0}
          >
            <option value="">Selecione uma Usina</option>
            {usinas.map(usina => (
              <option key={usina} value={usina}>
                {usina}
              </option>
            ))}
            {usinas.length > 0 && <option value="Todas as Usinas">Todas as Usinas</option>}
          </select>
          {showTextarea && (
            <button
              onClick={handleSave}
              disabled={isLoading}
              className={styles.saveButton}
              title="Salvar"
            >
              {isLoading ? 'Salvando...' : 'Salvar'}
            </button>
          )}
        </div>
      </div>

      {data && (
        <div className={styles.tableWrapper}>
          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th className={styles.intervalColumn}>Intervalo</th>
                  <th className={styles.totalColumn}>Total</th>
                  {data.usinas.map(usina => (
                    <th
                      key={usina.codUsina}
                      className={
                        usina.codUsina === formData.codUsina
                          ? styles.selectedColumn
                          : ''
                      }
                    >
                      {usina.codUsina}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {gerarIntervalos().map((intervalo, idx) => (
                  <tr key={intervalo.intervalo}>
                    <td className={styles.intervalCell}>{intervalo.horario}</td>
                    <td className={styles.totalCell}>
                      {totaisPorIntervalo[idx]?.total || 0}
                    </td>
                    {data.usinas.map(usina => (
                      <td
                        key={`${usina.codUsina}-${intervalo.intervalo}`}
                        className={
                          usina.codUsina === formData.codUsina
                            ? styles.selectedCell
                            : ''
                        }
                      >
                        {usina.intervalos[idx]?.valRazaoEnerTran || 0}
                      </td>
                    ))}
                  </tr>
                ))}
                <tr className={styles.totalRow}>
                  <td className={styles.totalLabel}>Total</td>
                  <td className={styles.totalCell}>
                    {data.usinas.reduce((sum, u) => sum + u.total, 0)}
                  </td>
                  {data.usinas.map(usina => (
                    <td key={`total-${usina.codUsina}`} className={styles.totalCell}>
                      {usina.total}
                    </td>
                  ))}
                </tr>
                <tr className={styles.totalRow}>
                  <td className={styles.totalLabel}>Média</td>
                  <td className={styles.totalCell}>
                    {Math.floor(
                      data.usinas.reduce((sum, u) => sum + u.media, 0) / data.usinas.length
                    ) || 0}
                  </td>
                  {data.usinas.map(usina => (
                    <td key={`media-${usina.codUsina}`} className={styles.totalCell}>
                      {usina.media}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>

          {showTextarea && (
            <div className={styles.textareaOverlay} style={getTextareaStyle()}>
              <textarea
                value={textareaValue}
                onChange={e => setTextareaValue(e.target.value)}
                onKeyUp={handleTextareaKeyUp}
                rows={48}
                className={styles.textarea}
                placeholder="Digite os valores (Enter separa intervalos, Tab separa usinas)"
              />
            </div>
          )}
        </div>
      )}

      {!data && !isLoading && formData.codEmpresa && (
        <div className={styles.emptyState}>
          <p>Nenhum dado disponível para os filtros selecionados.</p>
        </div>
      )}

      {isLoading && (
        <div className={styles.loading}>
          <p>Carregando dados...</p>
        </div>
      )}
    </div>
  );
};

export default Energetic;
