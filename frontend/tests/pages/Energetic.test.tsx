import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Energetic from '../../src/pages/Collection/Energetic/Energetic';
import {
  DadosEnergeticosData,
  EnergeticFormData,
  gerarIntervalos,
  calcularTotal,
  calcularMedia,
  intervaloParaHorario,
} from '../../src/types/energetic';

describe('Energetic Component', () => {
  const mockOnLoadData = vi.fn();
  const mockOnSave = vi.fn();

  const mockData: DadosEnergeticosData = {
    dataPdp: '15/01/2025',
    codEmpresa: 'EMP001',
    usinas: [
      {
        codUsina: 'UHE001',
        intervalos: gerarIntervalos(),
        total: 0,
        media: 0,
      },
      {
        codUsina: 'UHE002',
        intervalos: gerarIntervalos(),
        total: 0,
        media: 0,
      },
    ],
    totaisPorIntervalo: gerarIntervalos().map(int => ({
      intervalo: int.intervalo,
      horario: int.horario,
      total: 0,
    })),
  };

  beforeEach(() => {
    mockOnLoadData.mockClear();
    mockOnSave.mockClear();
  });

  describe('Renderização Inicial', () => {
    it('deve renderizar o título da página', () => {
      render(<Energetic onLoadData={mockOnLoadData} onSave={mockOnSave} />);
      expect(screen.getByText('Razão Energética Transformada')).toBeInTheDocument();
    });

    it('deve renderizar os campos do formulário', () => {
      render(<Energetic onLoadData={mockOnLoadData} onSave={mockOnSave} />);
      
      expect(screen.getByLabelText(/Data PDP:/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Empresa:/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Usinas:/i)).toBeInTheDocument();
    });

    it('deve iniciar com selects vazios', () => {
      render(<Energetic onLoadData={mockOnLoadData} onSave={mockOnSave} />);
      
      const dataPdpSelect = screen.getByLabelText(/Data PDP:/i) as HTMLSelectElement;
      const empresaSelect = screen.getByLabelText(/Empresa:/i) as HTMLSelectElement;
      const usinaSelect = screen.getByLabelText(/Usinas:/i) as HTMLSelectElement;
      
      expect(dataPdpSelect.value).toBe('');
      expect(empresaSelect.value).toBe('');
      expect(usinaSelect.value).toBe('');
    });

    it('não deve mostrar tabela inicialmente', () => {
      render(<Energetic onLoadData={mockOnLoadData} onSave={mockOnSave} />);
      expect(screen.queryByRole('table')).not.toBeInTheDocument();
    });

    it('não deve mostrar botão salvar inicialmente', () => {
      render(<Energetic onLoadData={mockOnLoadData} onSave={mockOnSave} />);
      expect(screen.queryByRole('button', { name: /salvar/i })).not.toBeInTheDocument();
    });
  });

  describe('Interação com Formulário', () => {
    it('deve permitir selecionar data PDP', async () => {
      const user = userEvent.setup();
      render(<Energetic onLoadData={mockOnLoadData} onSave={mockOnSave} />);
      
      const dataPdpSelect = screen.getByLabelText(/Data PDP:/i) as HTMLSelectElement;
      await user.selectOptions(dataPdpSelect, '15/01/2025');
      
      expect(dataPdpSelect.value).toBe('15/01/2025');
    });

    it('deve permitir selecionar empresa', async () => {
      const user = userEvent.setup();
      render(<Energetic onLoadData={mockOnLoadData} onSave={mockOnSave} />);
      
      const empresaSelect = screen.getByLabelText(/Empresa:/i) as HTMLSelectElement;
      await user.selectOptions(empresaSelect, 'EMP001');
      
      expect(empresaSelect.value).toBe('EMP001');
    });

    it('deve desabilitar select de usinas quando empresa não está selecionada', () => {
      render(<Energetic onLoadData={mockOnLoadData} onSave={mockOnSave} />);
      
      const usinaSelect = screen.getByLabelText(/Usinas:/i) as HTMLSelectElement;
      expect(usinaSelect).toBeDisabled();
    });
  });

  describe('Carregamento de Dados', () => {
    it('deve carregar dados quando empresa é selecionada', async () => {
      mockOnLoadData.mockResolvedValue(mockData);
      const user = userEvent.setup();
      
      render(<Energetic onLoadData={mockOnLoadData} onSave={mockOnSave} />);
      
      // Seleciona data
      const dataPdpSelect = screen.getByLabelText(/Data PDP:/i);
      await user.selectOptions(dataPdpSelect, '15/01/2025');
      
      // Seleciona empresa
      const empresaSelect = screen.getByLabelText(/Empresa:/i);
      await user.selectOptions(empresaSelect, 'EMP001');
      
      await waitFor(() => {
        expect(mockOnLoadData).toHaveBeenCalledWith({
          dataPdp: '15/01/2025',
          codEmpresa: 'EMP001',
          codUsina: '',
        });
      });
    });

    it('deve exibir mensagem de erro quando carregamento falha', async () => {
      mockOnLoadData.mockRejectedValue(new Error('Erro ao carregar'));
      const user = userEvent.setup();
      
      render(<Energetic onLoadData={mockOnLoadData} onSave={mockOnSave} />);
      
      const dataPdpSelect = screen.getByLabelText(/Data PDP:/i);
      await user.selectOptions(dataPdpSelect, '15/01/2025');
      
      const empresaSelect = screen.getByLabelText(/Empresa:/i);
      await user.selectOptions(empresaSelect, 'EMP001');
      
      await waitFor(() => {
        expect(screen.getByText(/Não foi possível carregar os dados/i)).toBeInTheDocument();
      });
    });

    it('deve mostrar loading durante carregamento', async () => {
      mockOnLoadData.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)));
      const user = userEvent.setup();
      
      render(<Energetic onLoadData={mockOnLoadData} onSave={mockOnSave} />);
      
      const dataPdpSelect = screen.getByLabelText(/Data PDP:/i);
      await user.selectOptions(dataPdpSelect, '15/01/2025');
      
      const empresaSelect = screen.getByLabelText(/Empresa:/i);
      await user.selectOptions(empresaSelect, 'EMP001');
      
      expect(screen.getByText(/Carregando dados.../i)).toBeInTheDocument();
    });
  });

  describe('Visualização de Dados', () => {
    it('deve exibir tabela quando dados são carregados', async () => {
      mockOnLoadData.mockResolvedValue(mockData);
      const user = userEvent.setup();
      
      render(<Energetic onLoadData={mockOnLoadData} onSave={mockOnSave} />);
      
      const dataPdpSelect = screen.getByLabelText(/Data PDP:/i);
      await user.selectOptions(dataPdpSelect, '15/01/2025');
      
      const empresaSelect = screen.getByLabelText(/Empresa:/i);
      await user.selectOptions(empresaSelect, 'EMP001');
      
      await waitFor(() => {
        expect(screen.getByRole('table')).toBeInTheDocument();
      });
    });

    it('deve exibir colunas de usinas na tabela', async () => {
      mockOnLoadData.mockResolvedValue(mockData);
      const user = userEvent.setup();
      
      render(<Energetic onLoadData={mockOnLoadData} onSave={mockOnSave} />);
      
      const dataPdpSelect = screen.getByLabelText(/Data PDP:/i);
      await user.selectOptions(dataPdpSelect, '15/01/2025');
      
      const empresaSelect = screen.getByLabelText(/Empresa:/i);
      await user.selectOptions(empresaSelect, 'EMP001');
      
      await waitFor(() => {
        const table = screen.getByRole('table');
        expect(table).toBeInTheDocument();
        const headers = screen.getAllByText('UHE001');
        // Deve aparecer no select e na tabela
        expect(headers.length).toBeGreaterThanOrEqual(1);
      });
    });

    it('deve exibir 48 linhas de intervalos', async () => {
      mockOnLoadData.mockResolvedValue(mockData);
      const user = userEvent.setup();
      
      render(<Energetic onLoadData={mockOnLoadData} onSave={mockOnSave} />);
      
      const dataPdpSelect = screen.getByLabelText(/Data PDP:/i);
      await user.selectOptions(dataPdpSelect, '15/01/2025');
      
      const empresaSelect = screen.getByLabelText(/Empresa:/i);
      await user.selectOptions(empresaSelect, 'EMP001');
      
      await waitFor(() => {
        const table = screen.getByRole('table');
        const rows = table.querySelectorAll('tbody tr');
        // 48 intervalos + 2 linhas de totais/médias
        expect(rows.length).toBe(50);
      });
    });
  });

  describe('Estado Vazio', () => {
    it('deve exibir mensagem quando não há dados', async () => {
      mockOnLoadData.mockResolvedValue(null);
      const user = userEvent.setup();
      
      render(<Energetic onLoadData={mockOnLoadData} onSave={mockOnSave} />);
      
      const dataPdpSelect = screen.getByLabelText(/Data PDP:/i);
      await user.selectOptions(dataPdpSelect, '15/01/2025');
      
      const empresaSelect = screen.getByLabelText(/Empresa:/i);
      await user.selectOptions(empresaSelect, 'EMP001');
      
      await waitFor(() => {
        expect(screen.getByText(/Nenhum dado disponível/i)).toBeInTheDocument();
      });
    });
  });
});

describe('Energetic Helper Functions', () => {
  describe('gerarIntervalos', () => {
    it('deve gerar 48 intervalos', () => {
      const intervalos = gerarIntervalos();
      expect(intervalos).toHaveLength(48);
    });

    it('deve iniciar intervalos com valor zero', () => {
      const intervalos = gerarIntervalos();
      intervalos.forEach(int => {
        expect(int.valRazaoEnerTran).toBe(0);
      });
    });

    it('deve ter intervalos numerados de 1 a 48', () => {
      const intervalos = gerarIntervalos();
      intervalos.forEach((int, idx) => {
        expect(int.intervalo).toBe(idx + 1);
      });
    });
  });

  describe('intervaloParaHorario', () => {
    it('deve converter intervalo 1 para 00:00-00:30', () => {
      expect(intervaloParaHorario(1)).toBe('00:00-00:30');
    });

    it('deve converter intervalo 2 para 00:30-01:00', () => {
      expect(intervaloParaHorario(2)).toBe('00:30-01:00');
    });

    it('deve converter intervalo 48 para 23:30-24:00', () => {
      expect(intervaloParaHorario(48)).toBe('23:30-24:00');
    });
  });

  describe('calcularTotal', () => {
    it('deve calcular total de intervalos zerados', () => {
      const intervalos = gerarIntervalos();
      expect(calcularTotal(intervalos)).toBe(0);
    });

    it('deve calcular total com valores', () => {
      const intervalos = gerarIntervalos().map(int => ({
        ...int,
        valRazaoEnerTran: 10,
      }));
      expect(calcularTotal(intervalos)).toBe(480); // 10 * 48
    });
  });

  describe('calcularMedia', () => {
    it('deve calcular média de intervalos zerados', () => {
      const intervalos = gerarIntervalos();
      expect(calcularMedia(intervalos)).toBe(0);
    });

    it('deve calcular média com valores', () => {
      const intervalos = gerarIntervalos().map(int => ({
        ...int,
        valRazaoEnerTran: 48,
      }));
      expect(calcularMedia(intervalos)).toBe(48); // floor(48*48/48) = 48
    });

    it('deve arredondar média para baixo', () => {
      const intervalos = gerarIntervalos().map((int, idx) => ({
        ...int,
        valRazaoEnerTran: idx % 2 === 0 ? 10 : 11,
      }));
      const total = calcularTotal(intervalos);
      expect(calcularMedia(intervalos)).toBe(Math.floor(total / 48));
    });
  });
});
