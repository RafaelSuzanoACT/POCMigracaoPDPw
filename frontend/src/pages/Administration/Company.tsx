/**
 * Componente: Cadastro/Consulta de Empresas
 * Migração de: legado/pdpw/frmCnsEmpresa.aspx
 *
 * Funcionalidades:
 * - Listagem paginada de empresas
 * - Exibição de dados: código, nome, sigla, GTPO, controladora, região, sistema
 * - Paginação customizada
 */

import React, { useState, useEffect } from 'react';
import styles from './Company.module.css';
import type { Company, CompanyListResponse, PaginationParams } from '../../types/company';

interface CompanyProps {
  onLoadCompanies?: (params: PaginationParams) => Promise<CompanyListResponse>;
}

const Company: React.FC<CompanyProps> = ({ onLoadCompanies }) => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize] = useState(8);
  const [totalItems, setTotalItems] = useState(0);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const totalPages = Math.ceil(totalItems / pageSize);

  // Carregar empresas ao montar ou trocar página
  useEffect(() => {
    loadCompanies();
  }, [currentPage]);

  const loadCompanies = async () => {
    setLoading(true);
    setMessage(null);

    try {
      if (onLoadCompanies) {
        const response = await onLoadCompanies({ page: currentPage, pageSize });
        setCompanies(response.empresas);
        setTotalItems(response.total);
      } else {
        // Mock data para desenvolvimento
        const mockData = generateMockCompanies();
        const start = currentPage * pageSize;
        const end = start + pageSize;
        setCompanies(mockData.slice(start, end));
        setTotalItems(mockData.length);
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Erro ao carregar empresas' });
    } finally {
      setLoading(false);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Empresas</h2>
      </div>

      {message && <div className={`${styles.message} ${styles[message.type]}`}>{message.text}</div>}

      {loading && <div className={styles.loading}>Carregando...</div>}

      {!loading && companies.length > 0 && (
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Empresa</th>
                <th>Nome</th>
                <th>Sigla</th>
                <th>GTPO</th>
                <th>Controladora de Área</th>
                <th>Região</th>
                <th>Sistema</th>
                <th>Controlada por outra Empresa</th>
                <th>Área</th>
                <th>PDP Informado</th>
                <th>Empresa</th>
              </tr>
            </thead>
            <tbody>
              {companies.map((company, index) => (
                <tr key={company.codempre} className={index % 2 === 1 ? styles.alternateRow : ''}>
                  <td>{company.codempre}</td>
                  <td>{company.nomempre}</td>
                  <td>{company.sigempre}</td>
                  <td>{company.idgtpoempre}</td>
                  <td className={styles.centerCell}>
                    <input type="checkbox" checked={company.contr} disabled />
                  </td>
                  <td>{company.regiao || ''}</td>
                  <td>{company.sistema || ''}</td>
                  <td className={styles.centerCell}>
                    <input type="checkbox" checked={company.area_contr} disabled />
                  </td>
                  <td>{company.area_nao_contr || ''}</td>
                  <td className={styles.centerCell}>
                    <input type="checkbox" checked={company.infpdp} disabled />
                  </td>
                  <td>{company.empresa_nao_contr || ''}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {totalPages > 1 && (
            <div className={styles.pagination}>
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 0}
                className={styles.paginationButton}
              >
                &lt;Anterior
              </button>
              <span className={styles.pageInfo}>
                Página {currentPage + 1} de {totalPages}
              </span>
              <button
                onClick={handleNextPage}
                disabled={currentPage >= totalPages - 1}
                className={styles.paginationButton}
              >
                Próxima&gt;
              </button>
            </div>
          )}
        </div>
      )}

      {!loading && companies.length === 0 && (
        <div className={styles.noData}>Nenhuma empresa encontrada</div>
      )}
    </div>
  );
};

// Mock data para desenvolvimento/testes
function generateMockCompanies(): Company[] {
  const regions = ['Norte', 'Nordeste', 'Sul', 'Sudeste', 'Centro-Oeste'];
  const systems = ['SIN', 'AC/RO', 'MT'];
  const areas = ['ÁREA CTROL 1', 'ÁREA CTROL 2', 'ÁREA CTROL 3'];

  return Array.from({ length: 25 }, (_, i) => ({
    codempre: `EMP${String(i + 1).padStart(3, '0')}`,
    nomempre: `Empresa ${i + 1} S.A.`,
    sigempre: `EMP${i + 1}`,
    idgtpoempre: String((i % 5) + 1),
    contr: i % 3 === 0,
    regiao: i % 3 === 0 ? regions[i % regions.length] : null,
    sistema: i % 3 === 0 ? systems[i % systems.length] : null,
    area_contr: i % 3 !== 0,
    infpdp: i % 2 === 0,
    area_nao_contr: i % 3 !== 0 ? areas[i % areas.length] : null,
    empresa_nao_contr: i % 3 !== 0 ? `Controladora ${(i % 3) + 1}` : null,
  }));
}

export default Company;
