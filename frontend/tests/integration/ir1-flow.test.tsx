/**
 * T064: Integration test for IR1 flow (Nível de Partida)
 * 
 * Tests the complete flow of the IR1 component:
 * - Data loading from backend
 * - User interactions (selecting date, empresa, usina)
 * - Field cascading behavior
 * - Creating new records
 * - Updating existing records
 * - Error handling
 */

import { describe, it, expect, beforeAll, afterEach, afterAll } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import IR1 from '../../src/pages/Collection/Insumos/IR1';
import { server, mockEndpoint, mockErrorEndpoint } from '../setup/mswServer';

describe('Integration: IR1 flow - Nível de Partida', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  const createClient = () =>
    new QueryClient({
      defaultOptions: { 
        queries: { retry: false }, 
        mutations: { retry: false } 
      },
    });

  const renderWithClient = (ui: React.ReactElement) => {
    const client = createClient();
    return render(<QueryClientProvider client={client}>{ui}</QueryClientProvider>);
  };

  const setupHappyPathHandlers = (specificDate?: string) => {
    // Get today's date for mocking (component generates dates from today)
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    
    // Mock empresas endpoint - Note: default MSW handlers already handle this
    // But we override for test consistency
    server.resetHandlers();
    
    mockEndpoint('get', '/empresas', [
      { id: '1', codigo: 'EMP001', nome: 'Empresa Teste 1', tipo: 'GERADORA', ativo: true },
      { id: '2', codigo: 'EMP002', nome: 'Empresa Teste 2', tipo: 'GERADORA', ativo: true },
    ]);

    // Mock usinas by empresa endpoint
    mockEndpoint('get', '/usinas/empresa/1', [
      {
        id: 10,
        codigo: 'UHE001',
        nome: 'Usina Hidrelétrica 1',
        empresaId: '1',
        tipoUsina: 'HIDROELETRICA',
        subsistema: 'SUDESTE',
        potenciaInstalada: 100,
        ativo: true,
      },
      {
        id: 11,
        codigo: 'UHE002',
        nome: 'Usina Hidrelétrica 2',
        empresaId: '1',
        tipoUsina: 'HIDROELETRICA',
        subsistema: 'SUDESTE',
        potenciaInstalada: 150,
        ativo: true,
      },
    ]);

    mockEndpoint('get', '/usinas/empresa/2', [
      {
        id: 20,
        codigo: 'UHE003',
        nome: 'Usina Hidrelétrica 3',
        empresaId: '2',
        tipoUsina: 'HIDROELETRICA',
        subsistema: 'SUL',
        potenciaInstalada: 200,
        ativo: true,
      },
    ]);

    // Mock IR1 data by date endpoint - use dynamic date or specific date
    const mockDate = specificDate || todayStr;
    mockEndpoint('get', `/insumos-recebimento/ir1/${mockDate}`, {
      id: 1,
      dataReferencia: mockDate,
      niveisPartida: [
        {
          usinaId: 10,
          nivel: 100.5,
          volume: 1500.0,
        },
        {
          usinaId: 11,
          nivel: 95.3,
          volume: 1400.0,
        },
      ],
    });

    // Mock IR1 create endpoint
    mockEndpoint('post', '/insumos-recebimento/ir1', {
      id: 2,
      dataReferencia: mockDate,
      niveisPartida: [
        {
          usinaId: 10,
          nivel: 105.0,
          volume: 1550.0,
        },
      ],
    });

    // Mock IR1 update endpoint
    mockEndpoint('put', '/insumos-recebimento/ir1/1', {
      id: 1,
      dataReferencia: mockDate,
      niveisPartida: [
        {
          usinaId: 10,
          nivel: 110.5,
          volume: 1600.0,
        },
      ],
    });
  };

  it('should render IR1 component with all form elements', () => {
    renderWithClient(<IR1 />);

    // Verify main elements are rendered
    expect(screen.getByText(/Nível de Partida/i)).toBeInTheDocument();
    expect(screen.getByText(/Data PDP:/i)).toBeInTheDocument();
    expect(screen.getByText(/Empresa:/i)).toBeInTheDocument();
    expect(screen.getByText(/Usinas:/i)).toBeInTheDocument();
    expect(screen.getByText(/Valor:/i)).toBeInTheDocument();
  });

  it('should have empresa and usinas selects disabled initially', () => {
    renderWithClient(<IR1 />);

    const selects = screen.getAllByRole('combobox');
    const empresaSelect = selects[1] as HTMLSelectElement;
    const usinaSelect = selects[2] as HTMLSelectElement;

    expect(empresaSelect).toBeDisabled();
    expect(usinaSelect).toBeDisabled();
  });

  it('should enable empresa select when date is selected', async () => {
    setupHappyPathHandlers();
    renderWithClient(<IR1 />);

    const user = userEvent.setup();
    const selects = screen.getAllByRole('combobox');
    const dateSelect = selects[0] as HTMLSelectElement;

    // Get first available date option
    const dateOption = Array.from(dateSelect.options).find(opt => opt.value);
    expect(dateOption).toBeDefined();

    await user.selectOptions(dateSelect, dateOption!.value);

    await waitFor(() => {
      const empresaSelect = selects[1] as HTMLSelectElement;
      expect(empresaSelect).not.toBeDisabled();
    });
  });

  it('should load existing IR1 data and populate form', async () => {
    const user = userEvent.setup();
    
    // Get first date option from the component
    renderWithClient(<IR1 />);
    const selects = screen.getAllByRole('combobox');
    const dateSelect = selects[0] as HTMLSelectElement;
    const dateOptions = Array.from(dateSelect.options).filter(opt => opt.value);
    const firstDate = dateOptions[0]?.value;
    
    expect(firstDate).toBeDefined();
    
    // Setup handlers with the actual date
    setupHappyPathHandlers(firstDate);

    // Select date
    await user.selectOptions(dateSelect, firstDate!);

    // Select empresa
    await waitFor(() => {
      const empresaSelect = screen.getAllByRole('combobox')[1];
      expect(empresaSelect).not.toBeDisabled();
    }, { timeout: 3000 });

    await user.selectOptions(screen.getAllByRole('combobox')[1], 'EMP001');

    // Select usina
    await waitFor(() => {
      const usinaSelect = screen.getAllByRole('combobox')[2];
      expect(usinaSelect).not.toBeDisabled();
    }, { timeout: 3000 });

    await user.selectOptions(screen.getAllByRole('combobox')[2], 'UHE001');

    // Verify that the nivel value is loaded
    await waitFor(() => {
      const valorInput = screen.getByPlaceholderText(/Nível de Partida/i) as HTMLInputElement;
      expect(valorInput.value).toBe('100.5');
    }, { timeout: 3000 });

    // Verify save button appears
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /salvar/i })).toBeInTheDocument();
    }, { timeout: 3000 });
  });

  it('should create new IR1 record when no existing data', async () => {
    const user = userEvent.setup();
    
    // Render first to get available dates
    renderWithClient(<IR1 />);
    const selects = screen.getAllByRole('combobox');
    const dateSelect = selects[0] as HTMLSelectElement;
    const dateOptions = Array.from(dateSelect.options).filter(opt => opt.value);
    const secondDate = dateOptions[1]?.value || dateOptions[0]?.value;
    
    expect(secondDate).toBeDefined();
    
    // Setup handlers but mock null for this date (no existing data)
    server.resetHandlers();
    mockEndpoint('get', '/empresas', [
      { id: '1', codigo: 'EMP001', nome: 'Empresa Teste 1', tipo: 'GERADORA', ativo: true },
    ]);
    
    mockEndpoint('get', '/usinas/empresa/1', [
      {
        id: 10,
        codigo: 'UHE001',
        nome: 'Usina Hidrelétrica 1',
        empresaId: '1',
        tipoUsina: 'HIDROELETRICA',
        subsistema: 'SUDESTE',
        potenciaInstalada: 100,
        ativo: true,
      },
    ]);
    
    // Mock empty IR1 data for this date
    mockEndpoint('get', `/insumos-recebimento/ir1/${secondDate}`, null);
    
    mockEndpoint('post', '/insumos-recebimento/ir1', {
      id: 2,
      dataReferencia: secondDate,
      niveisPartida: [
        {
          usinaId: 10,
          nivel: 105.0,
          volume: 1550.0,
        },
      ],
    });

    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});

    // Select date
    await user.selectOptions(dateSelect, secondDate!);

    // Select empresa
    await waitFor(() => {
      const empresaSelect = screen.getAllByRole('combobox')[1];
      expect(empresaSelect).not.toBeDisabled();
    }, { timeout: 3000 });

    await user.selectOptions(screen.getAllByRole('combobox')[1], 'EMP001');

    // Select usina
    await waitFor(() => {
      const usinaSelect = screen.getAllByRole('combobox')[2];
      expect(usinaSelect).not.toBeDisabled();
    }, { timeout: 3000 });

    await user.selectOptions(screen.getAllByRole('combobox')[2], 'UHE001');

    // Enter nivel value
    await waitFor(() => {
      const valorInput = screen.getByPlaceholderText(/Nível de Partida/i);
      expect(valorInput).toBeInTheDocument();
    }, { timeout: 3000 });

    const valorInput = screen.getByPlaceholderText(/Nível de Partida/i) as HTMLInputElement;
    await user.clear(valorInput);
    await user.type(valorInput, '105.0');

    // Click save button
    await waitFor(() => {
      const saveButton = screen.getByRole('button', { name: /salvar/i });
      expect(saveButton).toBeInTheDocument();
    }, { timeout: 3000 });

    await user.click(screen.getByRole('button', { name: /salvar/i }));

    // Verify success alert
    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith('Nível de Partida salvo com sucesso!');
    }, { timeout: 3000 });

    alertSpy.mockRestore();
  });

  it('should update existing IR1 record', async () => {
    const user = userEvent.setup();
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});

    // Render first to get available dates
    renderWithClient(<IR1 />);
    const selects = screen.getAllByRole('combobox');
    const dateSelect = selects[0] as HTMLSelectElement;
    const dateOptions = Array.from(dateSelect.options).filter(opt => opt.value);
    const firstDate = dateOptions[0]?.value;
    
    expect(firstDate).toBeDefined();
    
    // Setup handlers with existing data for this date
    setupHappyPathHandlers(firstDate);

    // Select date
    await user.selectOptions(dateSelect, firstDate!);

    // Select empresa
    await waitFor(() => {
      const empresaSelect = screen.getAllByRole('combobox')[1];
      expect(empresaSelect).not.toBeDisabled();
    }, { timeout: 3000 });

    await user.selectOptions(screen.getAllByRole('combobox')[1], 'EMP001');

    // Select usina
    await waitFor(() => {
      const usinaSelect = screen.getAllByRole('combobox')[2];
      expect(usinaSelect).not.toBeDisabled();
    }, { timeout: 3000 });

    await user.selectOptions(screen.getAllByRole('combobox')[2], 'UHE001');

    // Wait for existing data to load
    await waitFor(() => {
      const valorInput = screen.getByPlaceholderText(/Nível de Partida/i) as HTMLInputElement;
      expect(valorInput.value).toBe('100.5');
    }, { timeout: 3000 });

    // Modify the value
    const valorInput = screen.getByPlaceholderText(/Nível de Partida/i) as HTMLInputElement;
    await user.clear(valorInput);
    await user.type(valorInput, '110.5');

    // Click save button
    await waitFor(() => {
      const saveButton = screen.getByRole('button', { name: /salvar/i });
      expect(saveButton).toBeInTheDocument();
    }, { timeout: 3000 });

    await user.click(screen.getByRole('button', { name: /salvar/i }));

    // Verify success alert
    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith('Nível de Partida salvo com sucesso!');
    }, { timeout: 3000 });

    alertSpy.mockRestore();
  });

  it('should validate required fields before saving', async () => {
    setupHappyPathHandlers();
    mockEndpoint('get', '/insumos-recebimento/ir1/2025-01-02', null);

    renderWithClient(<IR1 />);

    const user = userEvent.setup();
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});

    // Select date, empresa, usina but don't enter a value
    const selects = screen.getAllByRole('combobox');
    const dateSelect = selects[0] as HTMLSelectElement;
    const dateOptions = Array.from(dateSelect.options);
    const firstDate = dateOptions.find(opt => opt.value);
    
    if (firstDate) {
      await user.selectOptions(dateSelect, firstDate.value);
    }

    await waitFor(() => {
      const empresaSelect = screen.getAllByRole('combobox')[1];
      expect(empresaSelect).not.toBeDisabled();
    });

    await user.selectOptions(screen.getAllByRole('combobox')[1], 'EMP001');

    await waitFor(() => {
      const usinaSelect = screen.getAllByRole('combobox')[2];
      expect(usinaSelect).not.toBeDisabled();
    });

    await user.selectOptions(screen.getAllByRole('combobox')[2], 'UHE001');

    // Clear the input field
    await waitFor(() => {
      const valorInput = screen.getByPlaceholderText(/Nível de Partida/i);
      expect(valorInput).toBeInTheDocument();
    });

    const valorInput = screen.getByPlaceholderText(/Nível de Partida/i) as HTMLInputElement;
    await user.clear(valorInput);

    // Try to save without value
    await waitFor(() => {
      const saveButton = screen.getByRole('button', { name: /salvar/i });
      expect(saveButton).toBeInTheDocument();
    });

    await user.click(screen.getByRole('button', { name: /salvar/i }));

    // Verify validation alert
    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith('Por favor, preencha todos os campos');
    });

    alertSpy.mockRestore();
  });

  it('should display error message when API fails', async () => {
    // Mock API error for IR1 data fetch
    mockErrorEndpoint('get', '/insumos-recebimento/ir1/2025-01-01', 500, 'Server error');

    mockEndpoint('get', '/empresas', [
      { id: '1', codigo: 'EMP001', nome: 'Empresa Teste 1', tipo: 'GERADORA', ativo: true },
    ]);

    renderWithClient(<IR1 />);

    const user = userEvent.setup();

    // Select date to trigger API call
    const selects = screen.getAllByRole('combobox');
    const dateSelect = selects[0] as HTMLSelectElement;
    const dateOptions = Array.from(dateSelect.options);
    const targetDate = dateOptions.find(opt => opt.value === '2025-01-01');
    
    if (targetDate) {
      await user.selectOptions(dateSelect, targetDate.value);
    }

    // Wait for error message to appear
    await waitFor(() => {
      expect(screen.getByText(/Não foi possível carregar os dados de IR1/i)).toBeInTheDocument();
    });
  });

  it('should handle save error gracefully', async () => {
    setupHappyPathHandlers();
    mockEndpoint('get', '/insumos-recebimento/ir1/2025-01-02', null);
    
    // Mock save error
    mockErrorEndpoint('post', '/insumos-recebimento/ir1', 500, 'Failed to save');

    renderWithClient(<IR1 />);

    const user = userEvent.setup();
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    // Select date, empresa, usina and enter value
    const selects = screen.getAllByRole('combobox');
    const dateSelect = selects[0] as HTMLSelectElement;
    const dateOptions = Array.from(dateSelect.options);
    const targetDate = dateOptions.find(opt => opt.value === '2025-01-02');
    
    if (targetDate) {
      await user.selectOptions(dateSelect, targetDate.value);
    } else {
      const firstDate = dateOptions.find(opt => opt.value);
      if (firstDate) {
        await user.selectOptions(dateSelect, firstDate.value);
      }
    }

    await waitFor(() => {
      const empresaSelect = screen.getAllByRole('combobox')[1];
      expect(empresaSelect).not.toBeDisabled();
    });

    await user.selectOptions(screen.getAllByRole('combobox')[1], 'EMP001');

    await waitFor(() => {
      const usinaSelect = screen.getAllByRole('combobox')[2];
      expect(usinaSelect).not.toBeDisabled();
    });

    await user.selectOptions(screen.getAllByRole('combobox')[2], 'UHE001');

    await waitFor(() => {
      const valorInput = screen.getByPlaceholderText(/Nível de Partida/i);
      expect(valorInput).toBeInTheDocument();
    });

    const valorInput = screen.getByPlaceholderText(/Nível de Partida/i) as HTMLInputElement;
    await user.clear(valorInput);
    await user.type(valorInput, '105.0');

    // Click save button
    await waitFor(() => {
      const saveButton = screen.getByRole('button', { name: /salvar/i });
      expect(saveButton).toBeInTheDocument();
    });

    await user.click(screen.getByRole('button', { name: /salvar/i }));

    // Verify error alert
    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith('Erro ao salvar Nível de Partida');
    });

    alertSpy.mockRestore();
    consoleSpy.mockRestore();
  });

  it('should reset dependent fields when date changes', async () => {
    setupHappyPathHandlers();
    renderWithClient(<IR1 />);

    const user = userEvent.setup();

    // Select first date
    const selects = screen.getAllByRole('combobox');
    const dateSelect = selects[0] as HTMLSelectElement;
    const dateOptions = Array.from(dateSelect.options);
    const firstDate = dateOptions.find(opt => opt.value);
    
    if (firstDate) {
      await user.selectOptions(dateSelect, firstDate.value);
    }

    // Select empresa
    await waitFor(() => {
      const empresaSelect = screen.getAllByRole('combobox')[1];
      expect(empresaSelect).not.toBeDisabled();
    });

    await user.selectOptions(screen.getAllByRole('combobox')[1], 'EMP001');

    // Select usina
    await waitFor(() => {
      const usinaSelect = screen.getAllByRole('combobox')[2];
      expect(usinaSelect).not.toBeDisabled();
    });

    await user.selectOptions(screen.getAllByRole('combobox')[2], 'UHE001');

    // Verify save button appears
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /salvar/i })).toBeInTheDocument();
    });

    // Change date
    const secondDate = dateOptions.find((opt, idx) => idx === 2 && opt.value);
    if (secondDate) {
      await user.selectOptions(dateSelect, secondDate.value);

      // Verify empresa, usina, and value are reset
      await waitFor(() => {
        const empresaSelect = screen.getAllByRole('combobox')[1] as HTMLSelectElement;
        const usinaSelect = screen.getAllByRole('combobox')[2] as HTMLSelectElement;
        const valorInput = screen.getByPlaceholderText(/Nível de Partida/i) as HTMLInputElement;

        expect(empresaSelect.value).toBe('');
        expect(usinaSelect.value).toBe('');
        expect(valorInput.value).toBe('');
      });

      // Verify save button is hidden
      expect(screen.queryByRole('button', { name: /salvar/i })).not.toBeInTheDocument();
    }
  });
});
