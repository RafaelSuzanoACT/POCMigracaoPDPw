import React, { useState, useEffect } from 'react';
import styles from './IR1.module.css';
import { IR1FormData } from '../../../types/regulatoryInputs';

/**
 * Componente para Coleta de IR1 - Nível de Partida
 * Registra nível de partida de reservatórios hidrelétricos
 * Dado regulatório para planejamento operacional
 */
const IR1: React.FC = () => {
  const [formData, setFormData] = useState<IR1FormData>({
    dataPDP: '',
    empresa: '',
    usina: '',
    nivelPartida: ''
  });

  const [dataOptions, setDataOptions] = useState<string[]>([]);
  const [empresaOptions, setEmpresaOptions] = useState<string[]>([]);
  const [usinaOptions, setUsinaOptions] = useState<string[]>([]);
  const [showSaveButton, setShowSaveButton] = useState(false);

  useEffect(() => {
    setDataOptions(['2024-01-01', '2024-01-02', '2024-01-03']);
  }, []);

  const handleDataChange = (value: string) => {
    setFormData(prev => ({ ...prev, dataPDP: value, empresa: '', usina: '', nivelPartida: '' }));
    
    if (value) {
      setEmpresaOptions(['Empresa A', 'Empresa B', 'Empresa C']);
    } else {
      setEmpresaOptions([]);
    }
    
    setShowSaveButton(false);
  };

  const handleEmpresaChange = (value: string) => {
    setFormData(prev => ({ ...prev, empresa: value, usina: '', nivelPartida: '' }));
    
    if (value) {
      setUsinaOptions(['Usina 1', 'Usina 2', 'Usina 3']);
    } else {
      setUsinaOptions([]);
    }
    
    setShowSaveButton(false);
  };

  const handleUsinaChange = (value: string) => {
    setFormData(prev => ({ ...prev, usina: value, nivelPartida: '' }));
    
    if (value) {
      setFormData(prev => ({ ...prev, nivelPartida: '100.5' }));
      setShowSaveButton(true);
    } else {
      setShowSaveButton(false);
    }
  };

  const handleNivelPartidaChange = (value: string) => {
    setFormData(prev => ({ ...prev, nivelPartida: value }));
  };

  const handleSave = () => {
    if (!formData.dataPDP || !formData.empresa || !formData.usina || !formData.nivelPartida) {
      alert('Por favor, preencha todos os campos');
      return;
    }

    console.log('Salvando IR1 - Nível de Partida:', formData);
    alert('Nível de Partida salvo com sucesso!');
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.titleBar}>
          <img src="/images/tit_sis_guideline.gif" alt="Sistema" />
        </div>
        <div className={styles.pageTitle}>
          <h2 className={styles.title}>Nível de Partida</h2>
        </div>
      </div>

      <div className={styles.formSection}>
        <div className={styles.formRow}>
          <label>
            <strong>Data PDP:</strong>
          </label>
          <select
            value={formData.dataPDP}
            onChange={(e) => handleDataChange(e.target.value)}
            className={styles.select}
          >
            <option value="">Selecione</option>
            {dataOptions.map(data => (
              <option key={data} value={data}>{data}</option>
            ))}
          </select>
        </div>

        <div className={styles.formRow}>
          <label>
            <strong>Empresa:</strong>
          </label>
          <select
            value={formData.empresa}
            onChange={(e) => handleEmpresaChange(e.target.value)}
            className={styles.select}
            disabled={!formData.dataPDP}
          >
            <option value="">Selecione</option>
            {empresaOptions.map(emp => (
              <option key={emp} value={emp}>{emp}</option>
            ))}
          </select>
        </div>

        <div className={styles.formRow}>
          <label>
            <strong>Usinas:</strong>
          </label>
          <select
            value={formData.usina}
            onChange={(e) => handleUsinaChange(e.target.value)}
            className={styles.select}
            disabled={!formData.empresa}
          >
            <option value="">Selecione</option>
            {usinaOptions.map(usina => (
              <option key={usina} value={usina}>{usina}</option>
            ))}
          </select>
        </div>

        <div className={styles.formRow}>
          <label>
            <strong>Valor:</strong>
          </label>
          <input
            type="number"
            step="0.01"
            value={formData.nivelPartida}
            onChange={(e) => handleNivelPartidaChange(e.target.value)}
            className={styles.input}
            disabled={!formData.usina}
            placeholder="Nível de Partida (m)"
          />
          {showSaveButton && (
            <button
              onClick={handleSave}
              className={styles.saveButton}
            >
              Salvar
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default IR1;
