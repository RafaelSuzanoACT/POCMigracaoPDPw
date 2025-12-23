import React, { useState, useEffect } from 'react';
import styles from './UserTeamAssociation.module.css';
import {
  UsuarioEquipeAssociacao,
  EquipeOption,
  UsuarioOption,
  UserTeamQueryParams,
  UserTeamQueryResponse,
  isEquipeValida,
  isUsuarioValido,
  podeIncluir,
  validarSelecaoExclusao,
  formatarNomeUpperCase,
} from '../../../types/userTeamAssociation';

interface UserTeamAssociationProps {
  onLoadEquipes: () => Promise<EquipeOption[]>;
  onLoadUsuarios: () => Promise<UsuarioOption[]>;
  onSearch: (params: UserTeamQueryParams) => Promise<UserTeamQueryResponse>;
  onInclude: (idEquipe: string, usuarId: string) => Promise<void>;
  onDelete: (ids: number[]) => Promise<void>;
}

const UserTeamAssociation: React.FC<UserTeamAssociationProps> = ({
  onLoadEquipes,
  onLoadUsuarios,
  onSearch,
  onInclude,
  onDelete,
}) => {
  const [equipes, setEquipes] = useState<EquipeOption[]>([]);
  const [usuarios, setUsuarios] = useState<UsuarioOption[]>([]);
  const [equipeSelecionada, setEquipeSelecionada] = useState<string>('');
  const [usuarioSelecionado, setUsuarioSelecionado] = useState<string>('');
  const [associacoes, setAssociacoes] = useState<UsuarioEquipeAssociacao[]>([]);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Paginação
  const [currentPage, setCurrentPage] = useState<number>(0);
  const pageSize = 5;

  // Carrega equipes e usuários ao montar
  useEffect(() => {
    carregarDados();
  }, []);

  // Recarrega associações quando filtros mudam
  useEffect(() => {
    if (equipeSelecionada !== '' || usuarioSelecionado !== '') {
      carregarAssociacoes();
    }
  }, [equipeSelecionada, usuarioSelecionado]);

  const carregarDados = async () => {
    try {
      setLoading(true);
      setError(null);

      const [equipesData, usuariosData] = await Promise.all([onLoadEquipes(), onLoadUsuarios()]);

      setEquipes(equipesData);
      setUsuarios(usuariosData);
    } catch (err) {
      console.error('Erro ao carregar dados:', err);
      setError('Não foi possível recuperar os registros.');
    } finally {
      setLoading(false);
    }
  };

  const carregarAssociacoes = async () => {
    try {
      setLoading(true);
      setError(null);
      setCurrentPage(0);
      setSelectedIds(new Set());

      const params: UserTeamQueryParams = {};

      if (isEquipeValida(equipeSelecionada)) {
        params.idEquipePdp = equipeSelecionada;
      }

      if (isUsuarioValido(usuarioSelecionado)) {
        params.usuarId = usuarioSelecionado;
      }

      const response = await onSearch(params);
      setAssociacoes(response.associacoes);
    } catch (err) {
      console.error('Erro ao carregar associações:', err);
      setError('Não foi possível recuperar os registros.');
      setAssociacoes([]);
    } finally {
      setLoading(false);
    }
  };

  const handleIncluir = async () => {
    if (!podeIncluir(equipeSelecionada, usuarioSelecionado, associacoes.length)) {
      setError('Não foi possível incluir a associação. Verifique se equipe e usuário estão selecionados e se não há associações existentes.');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setSuccessMessage(null);

      await onInclude(equipeSelecionada, usuarioSelecionado);
      setSuccessMessage('Associação incluída com sucesso!');
      await carregarAssociacoes();
    } catch (err) {
      console.error('Erro ao incluir associação:', err);
      setError('Não foi possível incluir a associação!');
    } finally {
      setLoading(false);
    }
  };

  const handleExcluir = async () => {
    const idsArray = Array.from(selectedIds);
    const validacao = validarSelecaoExclusao(idsArray);

    if (!validacao.valido) {
      setError(validacao.mensagem);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setSuccessMessage(null);

      await onDelete(idsArray);
      setSuccessMessage(`${idsArray.length} associação(ões) excluída(s) com sucesso!`);
      setSelectedIds(new Set());
      setCurrentPage(0);
      await carregarAssociacoes();
    } catch (err: any) {
      console.error('Erro ao excluir associações:', err);
      if (err.message && err.message.toLowerCase().includes('constraint')) {
        setError('Não é possível excluir, o usuário está associado a um estudo.');
      } else {
        setError('Erro ao excluir.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCheckboxChange = (id: number) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedIds(newSelected);
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const allIds = paginatedData.map((assoc) => assoc.idUsuarEquipePdp);
      setSelectedIds(new Set(allIds));
    } else {
      setSelectedIds(new Set());
    }
  };

  const handlePageChange = (newPage: number) => {
    const totalPages = Math.ceil(associacoes.length / pageSize);
    if (newPage >= 0 && newPage < totalPages) {
      setCurrentPage(newPage);
    }
  };

  // Dados paginados
  const startIndex = currentPage * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = associacoes.slice(startIndex, endIndex);
  const totalPages = Math.ceil(associacoes.length / pageSize);

  const allPageSelected =
    paginatedData.length > 0 && paginatedData.every((assoc) => selectedIds.has(assoc.idUsuarEquipePdp));

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Associar Usuário-Equipe PDP</h2>
      </div>

      {error && (
        <div className={styles.error} data-testid="error-message">
          {error}
        </div>
      )}

      {successMessage && (
        <div className={styles.success} data-testid="success-message">
          {successMessage}
        </div>
      )}

      <div className={styles.filterContainer}>
        <div className={styles.filterRow}>
          <div className={styles.formGroup}>
            <label htmlFor="equipeSelect">Equipe:</label>
            <select
              id="equipeSelect"
              value={equipeSelecionada}
              onChange={(e) => setEquipeSelecionada(e.target.value)}
              disabled={loading}
              data-testid="equipe-select"
            >
              <option value="">Selecione uma equipe</option>
              {equipes.map((equipe) => (
                <option key={equipe.idEquipePdp} value={equipe.idEquipePdp}>
                  {formatarNomeUpperCase(equipe.nomEquipePdp)}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="usuarioSelect">Usuário:</label>
            <select
              id="usuarioSelect"
              value={usuarioSelecionado}
              onChange={(e) => setUsuarioSelecionado(e.target.value)}
              disabled={loading}
              data-testid="usuario-select"
            >
              <option value="">Selecione um usuário</option>
              {usuarios.map((usuario) => (
                <option key={usuario.usuarId} value={usuario.usuarId}>
                  {formatarNomeUpperCase(usuario.usuarNome)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className={styles.gridContainer} data-testid="grid-container">
        <div className={styles.tableWrapper}>
          <table className={styles.table} data-testid="associacoes-table">
            <thead>
              <tr>
                <th className={styles.checkboxCol}>
                  <input
                    type="checkbox"
                    checked={allPageSelected}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    disabled={paginatedData.length === 0}
                    data-testid="select-all-checkbox"
                  />
                </th>
                <th>Equipe</th>
                <th>Usuário</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.length > 0 ? (
                paginatedData.map((assoc, index) => (
                  <tr
                    key={assoc.idUsuarEquipePdp}
                    className={index % 2 === 1 ? styles.alternateRow : ''}
                    data-testid={`assoc-row-${index}`}
                  >
                    <td className={styles.checkboxCol}>
                      <input
                        type="checkbox"
                        checked={selectedIds.has(assoc.idUsuarEquipePdp)}
                        onChange={() => handleCheckboxChange(assoc.idUsuarEquipePdp)}
                        data-testid={`checkbox-${assoc.idUsuarEquipePdp}`}
                      />
                    </td>
                    <td>{formatarNomeUpperCase(assoc.nomEquipePdp)}</td>
                    <td>{formatarNomeUpperCase(assoc.usuarNome)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className={styles.noData}>
                    {loading ? 'Carregando...' : 'Nenhuma associação encontrada. Selecione equipe e/ou usuário para filtrar.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className={styles.pagination} data-testid="pagination">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 0}
              className={styles.paginationBtn}
              data-testid="prev-page-btn"
            >
              &lt; Anterior
            </button>
            <span className={styles.pageInfo} data-testid="page-info">
              Página {currentPage + 1} de {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage >= totalPages - 1}
              className={styles.paginationBtn}
              data-testid="next-page-btn"
            >
              Próxima &gt;
            </button>
          </div>
        )}

        <div className={styles.actionButtons}>
          <button
            onClick={handleIncluir}
            disabled={loading || !podeIncluir(equipeSelecionada, usuarioSelecionado, associacoes.length)}
            className={styles.btnIncluir}
            data-testid="incluir-btn"
          >
            Incluir
          </button>
          <button
            onClick={handleExcluir}
            disabled={loading || selectedIds.size === 0}
            className={styles.btnExcluir}
            data-testid="excluir-btn"
          >
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserTeamAssociation;
