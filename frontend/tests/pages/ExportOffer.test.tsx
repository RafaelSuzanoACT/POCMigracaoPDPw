/**
 * Testes para ExportOffer.tsx
 * Migração de: legado/pdpw/frmCnsOfertaExportacao.aspx
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ExportOffer from '../../../src/pages/Collection/Thermal/ExportOffer';
import type { OfertaExportacaoData } from '../../../src/types/exportOffer';

describe('ExportOffer', () => {
  const mockData: OfertaExportacaoData = {
    dataPdp: '20231215',
    codEmpresa: 'EMP001',
    nomeEmpresa: 'Empresa Termelétrica A',
    usinas: [
      {
        codUsina: 'USI001',
        nomeUsina: 'Usina Termo A',
        codConversora: 'CONV001',
        intervalos: Array.from({ length: 48 }, (_, i) => ({
          intervalo: i + 1,
          valor: (i + 1) * 10,
        })),
      },
      {
        codUsina: 'USI002',
        nomeUsina: 'Usina Termo B',
        codConversora: 'CONV002',
        intervalos: Array.from({ length: 48 }, (_, i) => ({
          intervalo: i + 1,
          valor: (i + 1) * 5,
        })),
      },
    ],
  };

  const mockOnSave = vi.fn().mockResolvedValue(undefined);
  const mockOnLoadData = vi.fn().mockResolvedValue(mockData);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Renderização Inicial', () => {
    it('deve renderizar o título da página', () => {
      render(<ExportOffer />);
      expect(screen.getByTestId('page-title')).toHaveTextContent('Oferta de Exportação');
    });

    it('deve renderizar o subtítulo da página', () => {
      render(<ExportOffer />);
      expect(screen.getByTestId('page-subtitle')).toHaveTextContent(
        'Coleta de ofertas de exportação de usinas termoelétricas conversoras'
      );
    });

    it('deve renderizar o container principal', () => {
      render(<ExportOffer />);
      expect(screen.getByTestId('export-offer-container')).toBeInTheDocument();
    });

    it('deve renderizar todos os campos do formulário', () => {
      render(<ExportOffer />);

      expect(screen.getByTestId('label-data-pdp')).toHaveTextContent('Data PDP:');
      expect(screen.getByTestId('select-data-pdp')).toBeInTheDocument();

      expect(screen.getByTestId('label-empresa')).toHaveTextContent('Empresa:');
      expect(screen.getByTestId('select-empresa')).toBeInTheDocument();

      expect(screen.getByTestId('label-usina')).toHaveTextContent('Usina Conversora:');
      expect(screen.getByTestId('select-usina')).toBeInTheDocument();
    });
  });

  describe('Interação com Formulário', () => {
    it('deve desabilitar select de empresa quando data não está selecionada', () => {
      render(<ExportOffer />);
      const selectEmpresa = screen.getByTestId('select-empresa') as HTMLSelectElement;
      expect(selectEmpresa.disabled).toBe(true);
    });

    it('deve desabilitar select de usina quando empresa não está selecionada', () => {
      render(<ExportOffer />);
      const selectUsina = screen.getByTestId('select-usina') as HTMLSelectElement;
      expect(selectUsina.disabled).toBe(true);
    });

    it('deve habilitar select de empresa quando data é selecionada', () => {
      render(<ExportOffer onLoadData={mockOnLoadData} />);
      const selectDataPdp = screen.getByTestId('select-data-pdp') as HTMLSelectElement;
      const selectEmpresa = screen.getByTestId('select-empresa') as HTMLSelectElement;

      fireEvent.change(selectDataPdp, { target: { value: '20231215' } });

      expect(selectEmpresa.disabled).toBe(false);
    });

    it('deve carregar dados quando data e empresa são selecionadas', async () => {
      render(<ExportOffer onLoadData={mockOnLoadData} />);

      const selectDataPdp = screen.getByTestId('select-data-pdp') as HTMLSelectElement;
      const selectEmpresa = screen.getByTestId('select-empresa') as HTMLSelectElement;

      fireEvent.change(selectDataPdp, { target: { value: '20231215' } });
      fireEvent.change(selectEmpresa, { target: { value: 'EMP001' } });

      await waitFor(() => {
        expect(mockOnLoadData).toHaveBeenCalledWith('20231215', 'EMP001');
      });
    });

    it('deve limpar dados ao mudar a data selecionada', async () => {
      render(<ExportOffer onLoadData={mockOnLoadData} />);

      const selectDataPdp = screen.getByTestId('select-data-pdp') as HTMLSelectElement;
      const selectEmpresa = screen.getByTestId('select-empresa') as HTMLSelectElement;

      // Primeira seleção
      fireEvent.change(selectDataPdp, { target: { value: '20231215' } });
      fireEvent.change(selectEmpresa, { target: { value: 'EMP001' } });

      await waitFor(() => {
        expect(mockOnLoadData).toHaveBeenCalledWith('20231215', 'EMP001');
      });

      // Mudar data
      fireEvent.change(selectDataPdp, { target: { value: '20231216' } });

      expect(selectEmpresa.value).toBe('');
    });
  });

  describe('Exibição de Loading', () => {
    it('deve exibir indicador de loading ao carregar dados', async () => {
      const slowLoadData = vi.fn(
        () => new Promise((resolve) => setTimeout(() => resolve(mockData), 100))
      );

      render(<ExportOffer onLoadData={slowLoadData} />);

      const selectDataPdp = screen.getByTestId('select-data-pdp') as HTMLSelectElement;
      const selectEmpresa = screen.getByTestId('select-empresa') as HTMLSelectElement;

      fireEvent.change(selectDataPdp, { target: { value: '20231215' } });
      fireEvent.change(selectEmpresa, { target: { value: 'EMP001' } });

      expect(await screen.findByTestId('loading-indicator')).toBeInTheDocument();
    });

    it('deve ocultar loading após carregar dados', async () => {
      render(<ExportOffer onLoadData={mockOnLoadData} />);

      const selectDataPdp = screen.getByTestId('select-data-pdp') as HTMLSelectElement;
      const selectEmpresa = screen.getByTestId('select-empresa') as HTMLSelectElement;

      fireEvent.change(selectDataPdp, { target: { value: '20231215' } });
      fireEvent.change(selectEmpresa, { target: { value: 'EMP001' } });

      await waitFor(() => {
        expect(screen.queryByTestId('loading-indicator')).not.toBeInTheDocument();
      });
    });
  });

  describe('Mensagens de Feedback', () => {
    it('deve exibir mensagem de erro ao falhar carregamento', async () => {
      const failLoadData = vi.fn().mockRejectedValue(new Error('Erro de rede'));

      render(<ExportOffer onLoadData={failLoadData} />);

      const selectDataPdp = screen.getByTestId('select-data-pdp') as HTMLSelectElement;
      const selectEmpresa = screen.getByTestId('select-empresa') as HTMLSelectElement;

      fireEvent.change(selectDataPdp, { target: { value: '20231215' } });
      fireEvent.change(selectEmpresa, { target: { value: 'EMP001' } });

      expect(await screen.findByTestId('message-error')).toHaveTextContent('Erro ao carregar dados');
    });

    it('deve exibir mensagem de sucesso após salvar', async () => {
      render(<ExportOffer onLoadData={mockOnLoadData} onSave={mockOnSave} />);

      const selectDataPdp = screen.getByTestId('select-data-pdp') as HTMLSelectElement;
      const selectEmpresa = screen.getByTestId('select-empresa') as HTMLSelectElement;

      fireEvent.change(selectDataPdp, { target: { value: '20231215' } });
      fireEvent.change(selectEmpresa, { target: { value: 'EMP001' } });

      await waitFor(() => {
        expect(mockOnLoadData).toHaveBeenCalled();
      });

      const selectUsina = screen.getByTestId('select-usina') as HTMLSelectElement;
      fireEvent.change(selectUsina, { target: { value: 'USI001' } });

      await waitFor(() => {
        expect(screen.getByTestId('textarea-values')).toBeInTheDocument();
      });

      const btnSave = screen.getByTestId('btn-save');
      fireEvent.click(btnSave);

      expect(await screen.findByTestId('message-success')).toHaveTextContent(
        'Dados salvos com sucesso!'
      );
    });

    it('deve exibir mensagem de erro ao falhar salvamento', async () => {
      const failSave = vi.fn().mockRejectedValue(new Error('Erro ao salvar'));

      render(<ExportOffer onLoadData={mockOnLoadData} onSave={failSave} />);

      const selectDataPdp = screen.getByTestId('select-data-pdp') as HTMLSelectElement;
      const selectEmpresa = screen.getByTestId('select-empresa') as HTMLSelectElement;

      fireEvent.change(selectDataPdp, { target: { value: '20231215' } });
      fireEvent.change(selectEmpresa, { target: { value: 'EMP001' } });

      await waitFor(() => {
        expect(mockOnLoadData).toHaveBeenCalled();
      });

      const selectUsina = screen.getByTestId('select-usina') as HTMLSelectElement;
      fireEvent.change(selectUsina, { target: { value: 'USI001' } });

      await waitFor(() => {
        expect(screen.getByTestId('textarea-values')).toBeInTheDocument();
      });

      const btnSave = screen.getByTestId('btn-save');
      fireEvent.click(btnSave);

      expect(await screen.findByTestId('message-error')).toHaveTextContent('Erro ao salvar dados');
    });
  });

  describe('Edição de Dados - Usina Individual', () => {
    it('deve exibir textarea ao selecionar usina individual', async () => {
      render(<ExportOffer onLoadData={mockOnLoadData} />);

      const selectDataPdp = screen.getByTestId('select-data-pdp') as HTMLSelectElement;
      const selectEmpresa = screen.getByTestId('select-empresa') as HTMLSelectElement;

      fireEvent.change(selectDataPdp, { target: { value: '20231215' } });
      fireEvent.change(selectEmpresa, { target: { value: 'EMP001' } });

      await waitFor(() => {
        expect(mockOnLoadData).toHaveBeenCalled();
      });

      const selectUsina = screen.getByTestId('select-usina') as HTMLSelectElement;
      fireEvent.change(selectUsina, { target: { value: 'USI001' } });

      await waitFor(() => {
        expect(screen.getByTestId('textarea-values')).toBeInTheDocument();
      });
    });

    it('deve preencher textarea com valores da usina selecionada', async () => {
      render(<ExportOffer onLoadData={mockOnLoadData} />);

      const selectDataPdp = screen.getByTestId('select-data-pdp') as HTMLSelectElement;
      const selectEmpresa = screen.getByTestId('select-empresa') as HTMLSelectElement;

      fireEvent.change(selectDataPdp, { target: { value: '20231215' } });
      fireEvent.change(selectEmpresa, { target: { value: 'EMP001' } });

      await waitFor(() => {
        expect(mockOnLoadData).toHaveBeenCalled();
      });

      const selectUsina = screen.getByTestId('select-usina') as HTMLSelectElement;
      fireEvent.change(selectUsina, { target: { value: 'USI001' } });

      const textarea = (await screen.findByTestId('textarea-values')) as HTMLTextAreaElement;
      const lines = textarea.value.split('\n');

      expect(lines).toHaveLength(48);
      expect(lines[0]).toBe('10');
      expect(lines[1]).toBe('20');
    });

    it('deve permitir edição de valores no textarea', async () => {
      render(<ExportOffer onLoadData={mockOnLoadData} />);

      const selectDataPdp = screen.getByTestId('select-data-pdp') as HTMLSelectElement;
      const selectEmpresa = screen.getByTestId('select-empresa') as HTMLSelectElement;

      fireEvent.change(selectDataPdp, { target: { value: '20231215' } });
      fireEvent.change(selectEmpresa, { target: { value: 'EMP001' } });

      await waitFor(() => {
        expect(mockOnLoadData).toHaveBeenCalled();
      });

      const selectUsina = screen.getByTestId('select-usina') as HTMLSelectElement;
      fireEvent.change(selectUsina, { target: { value: 'USI001' } });

      const textarea = (await screen.findByTestId('textarea-values')) as HTMLTextAreaElement;

      fireEvent.change(textarea, { target: { value: '100\n200\n300' } });

      expect(textarea.value).toBe('100\n200\n300');
    });

    it('deve exibir título correto para edição individual', async () => {
      render(<ExportOffer onLoadData={mockOnLoadData} />);

      const selectDataPdp = screen.getByTestId('select-data-pdp') as HTMLSelectElement;
      const selectEmpresa = screen.getByTestId('select-empresa') as HTMLSelectElement;

      fireEvent.change(selectDataPdp, { target: { value: '20231215' } });
      fireEvent.change(selectEmpresa, { target: { value: 'EMP001' } });

      await waitFor(() => {
        expect(mockOnLoadData).toHaveBeenCalled();
      });

      const selectUsina = screen.getByTestId('select-usina') as HTMLSelectElement;
      fireEvent.change(selectUsina, { target: { value: 'USI001' } });

      const title = await screen.findByTestId('data-section-title');
      expect(title).toHaveTextContent('Edição de Oferta: USI001');
    });
  });

  describe('Edição de Dados - Todas as Usinas', () => {
    it('deve exibir textarea ao selecionar "TODAS"', async () => {
      render(<ExportOffer onLoadData={mockOnLoadData} />);

      const selectDataPdp = screen.getByTestId('select-data-pdp') as HTMLSelectElement;
      const selectEmpresa = screen.getByTestId('select-empresa') as HTMLSelectElement;

      fireEvent.change(selectDataPdp, { target: { value: '20231215' } });
      fireEvent.change(selectEmpresa, { target: { value: 'EMP001' } });

      await waitFor(() => {
        expect(mockOnLoadData).toHaveBeenCalled();
      });

      const selectUsina = screen.getByTestId('select-usina') as HTMLSelectElement;
      fireEvent.change(selectUsina, { target: { value: 'TODAS' } });

      await waitFor(() => {
        expect(screen.getByTestId('textarea-values')).toBeInTheDocument();
      });
    });

    it('deve preencher textarea com valores separados por TAB', async () => {
      render(<ExportOffer onLoadData={mockOnLoadData} />);

      const selectDataPdp = screen.getByTestId('select-data-pdp') as HTMLSelectElement;
      const selectEmpresa = screen.getByTestId('select-empresa') as HTMLSelectElement;

      fireEvent.change(selectDataPdp, { target: { value: '20231215' } });
      fireEvent.change(selectEmpresa, { target: { value: 'EMP001' } });

      await waitFor(() => {
        expect(mockOnLoadData).toHaveBeenCalled();
      });

      const selectUsina = screen.getByTestId('select-usina') as HTMLSelectElement;
      fireEvent.change(selectUsina, { target: { value: 'TODAS' } });

      const textarea = (await screen.findByTestId('textarea-values')) as HTMLTextAreaElement;
      const lines = textarea.value.split('\n');

      expect(lines).toHaveLength(48);
      expect(lines[0]).toBe('10\t5'); // Valores das 2 usinas separados por TAB
    });

    it('deve exibir título correto para edição de todas as usinas', async () => {
      render(<ExportOffer onLoadData={mockOnLoadData} />);

      const selectDataPdp = screen.getByTestId('select-data-pdp') as HTMLSelectElement;
      const selectEmpresa = screen.getByTestId('select-empresa') as HTMLSelectElement;

      fireEvent.change(selectDataPdp, { target: { value: '20231215' } });
      fireEvent.change(selectEmpresa, { target: { value: 'EMP001' } });

      await waitFor(() => {
        expect(mockOnLoadData).toHaveBeenCalled();
      });

      const selectUsina = screen.getByTestId('select-usina') as HTMLSelectElement;
      fireEvent.change(selectUsina, { target: { value: 'TODAS' } });

      const title = await screen.findByTestId('data-section-title');
      expect(title).toHaveTextContent(
        'Edição de Todas as Usinas Conversoras (separadas por TAB)'
      );
    });
  });

  describe('Cálculo de Totais', () => {
    it('deve calcular total corretamente para usina individual', async () => {
      render(<ExportOffer onLoadData={mockOnLoadData} />);

      const selectDataPdp = screen.getByTestId('select-data-pdp') as HTMLSelectElement;
      const selectEmpresa = screen.getByTestId('select-empresa') as HTMLSelectElement;

      fireEvent.change(selectDataPdp, { target: { value: '20231215' } });
      fireEvent.change(selectEmpresa, { target: { value: 'EMP001' } });

      await waitFor(() => {
        expect(mockOnLoadData).toHaveBeenCalled();
      });

      const selectUsina = screen.getByTestId('select-usina') as HTMLSelectElement;
      fireEvent.change(selectUsina, { target: { value: 'USI001' } });

      await waitFor(() => {
        expect(screen.getByTestId('textarea-values')).toBeInTheDocument();
      });

      const totalValue = screen.getByTestId('total-value');
      // Soma de 10 + 20 + 30 + ... + 480 = 11760
      expect(totalValue).toHaveTextContent('11760 MW');
    });

    it('deve atualizar total ao editar valores', async () => {
      render(<ExportOffer onLoadData={mockOnLoadData} />);

      const selectDataPdp = screen.getByTestId('select-data-pdp') as HTMLSelectElement;
      const selectEmpresa = screen.getByTestId('select-empresa') as HTMLSelectElement;

      fireEvent.change(selectDataPdp, { target: { value: '20231215' } });
      fireEvent.change(selectEmpresa, { target: { value: 'EMP001' } });

      await waitFor(() => {
        expect(mockOnLoadData).toHaveBeenCalled();
      });

      const selectUsina = screen.getByTestId('select-usina') as HTMLSelectElement;
      fireEvent.change(selectUsina, { target: { value: 'USI001' } });

      const textarea = (await screen.findByTestId('textarea-values')) as HTMLTextAreaElement;

      fireEvent.change(textarea, { target: { value: '100\n200\n300' } });

      const totalValue = screen.getByTestId('total-value');
      expect(totalValue).toHaveTextContent('600 MW');
    });
  });

  describe('Salvamento de Dados', () => {
    it('deve chamar onSave ao clicar no botão salvar', async () => {
      render(<ExportOffer onLoadData={mockOnLoadData} onSave={mockOnSave} />);

      const selectDataPdp = screen.getByTestId('select-data-pdp') as HTMLSelectElement;
      const selectEmpresa = screen.getByTestId('select-empresa') as HTMLSelectElement;

      fireEvent.change(selectDataPdp, { target: { value: '20231215' } });
      fireEvent.change(selectEmpresa, { target: { value: 'EMP001' } });

      await waitFor(() => {
        expect(mockOnLoadData).toHaveBeenCalled();
      });

      const selectUsina = screen.getByTestId('select-usina') as HTMLSelectElement;
      fireEvent.change(selectUsina, { target: { value: 'USI001' } });

      await waitFor(() => {
        expect(screen.getByTestId('textarea-values')).toBeInTheDocument();
      });

      const btnSave = screen.getByTestId('btn-save');
      fireEvent.click(btnSave);

      await waitFor(() => {
        expect(mockOnSave).toHaveBeenCalled();
      });
    });

    it('deve desabilitar botão durante salvamento', async () => {
      const slowSave = vi.fn(
        () => new Promise((resolve) => setTimeout(() => resolve(undefined), 100))
      );

      render(<ExportOffer onLoadData={mockOnLoadData} onSave={slowSave} />);

      const selectDataPdp = screen.getByTestId('select-data-pdp') as HTMLSelectElement;
      const selectEmpresa = screen.getByTestId('select-empresa') as HTMLSelectElement;

      fireEvent.change(selectDataPdp, { target: { value: '20231215' } });
      fireEvent.change(selectEmpresa, { target: { value: 'EMP001' } });

      await waitFor(() => {
        expect(mockOnLoadData).toHaveBeenCalled();
      });

      const selectUsina = screen.getByTestId('select-usina') as HTMLSelectElement;
      fireEvent.change(selectUsina, { target: { value: 'USI001' } });

      await waitFor(() => {
        expect(screen.getByTestId('textarea-values')).toBeInTheDocument();
      });

      const btnSave = screen.getByTestId('btn-save') as HTMLButtonElement;
      fireEvent.click(btnSave);

      expect(btnSave.disabled).toBe(true);
      expect(btnSave).toHaveTextContent('Salvando...');
    });
  });

  describe('Estado Vazio', () => {
    it('deve exibir mensagem quando nenhuma usina está selecionada', async () => {
      render(<ExportOffer onLoadData={mockOnLoadData} />);

      const selectDataPdp = screen.getByTestId('select-data-pdp') as HTMLSelectElement;
      const selectEmpresa = screen.getByTestId('select-empresa') as HTMLSelectElement;

      fireEvent.change(selectDataPdp, { target: { value: '20231215' } });
      fireEvent.change(selectEmpresa, { target: { value: 'EMP001' } });

      await waitFor(() => {
        expect(mockOnLoadData).toHaveBeenCalled();
      });

      expect(screen.getByTestId('empty-state')).toBeInTheDocument();
      expect(screen.getByTestId('empty-state')).toHaveTextContent(
        'Selecione uma usina conversora para visualizar e editar as ofertas de exportação.'
      );
    });
  });

  describe('Validação de Entrada', () => {
    it('deve aceitar apenas números no textarea', async () => {
      render(<ExportOffer onLoadData={mockOnLoadData} />);

      const selectDataPdp = screen.getByTestId('select-data-pdp') as HTMLSelectElement;
      const selectEmpresa = screen.getByTestId('select-empresa') as HTMLSelectElement;

      fireEvent.change(selectDataPdp, { target: { value: '20231215' } });
      fireEvent.change(selectEmpresa, { target: { value: 'EMP001' } });

      await waitFor(() => {
        expect(mockOnLoadData).toHaveBeenCalled();
      });

      const selectUsina = screen.getByTestId('select-usina') as HTMLSelectElement;
      fireEvent.change(selectUsina, { target: { value: 'USI001' } });

      const textarea = (await screen.findByTestId('textarea-values')) as HTMLTextAreaElement;

      // Tentar digitar letra
      const event = new KeyboardEvent('keypress', { key: 'a' });
      Object.defineProperty(event, 'preventDefault', { value: vi.fn() });

      textarea.dispatchEvent(event);

      // Verificar que preventDefault foi chamado (letra bloqueada)
      expect(event.preventDefault).toHaveBeenCalled();
    });
  });

  describe('Labels dos Intervalos', () => {
    it('deve renderizar labels de intervalos quando dados são carregados', async () => {
      render(<ExportOffer onLoadData={mockOnLoadData} />);

      const selectDataPdp = screen.getByTestId('select-data-pdp') as HTMLSelectElement;
      const selectEmpresa = screen.getByTestId('select-empresa') as HTMLSelectElement;

      fireEvent.change(selectDataPdp, { target: { value: '20231215' } });
      fireEvent.change(selectEmpresa, { target: { value: 'EMP001' } });

      await waitFor(() => {
        expect(mockOnLoadData).toHaveBeenCalled();
      });

      const selectUsina = screen.getByTestId('select-usina') as HTMLSelectElement;
      fireEvent.change(selectUsina, { target: { value: 'USI001' } });

      await waitFor(() => {
        expect(screen.getByTestId('intervals-header')).toBeInTheDocument();
      });

      expect(screen.getByTestId('interval-label-1')).toHaveTextContent('00:00-00:30');
      expect(screen.getByTestId('interval-label-2')).toHaveTextContent('00:30-01:00');
      expect(screen.getByTestId('interval-label-48')).toHaveTextContent('23:30-00:00');
    });
  });
});
