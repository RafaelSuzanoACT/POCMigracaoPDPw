import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import IR1 from '../../../src/pages/Collection/Insumos/IR1';

describe('IR1 Component - Nível de Partida', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Renderização', () => {
    it('deve renderizar sem erros', () => {
      render(<IR1 />);
      expect(screen.getByText(/Nível de Partida/i)).toBeInTheDocument();
    });

    it('deve exibir formulário', () => {
      render(<IR1 />);
      
      expect(screen.getByText(/Data PDP:/i)).toBeInTheDocument();
      expect(screen.getByText(/Empresa:/i)).toBeInTheDocument();
      expect(screen.getByText(/Usinas:/i)).toBeInTheDocument();
      expect(screen.getByText(/Valor:/i)).toBeInTheDocument();
    });
  });

  describe('Cascata de campos', () => {
    it('deve habilitar Empresa ao selecionar Data', async () => {
      render(<IR1 />);
      
      const dataSelect = screen.getAllByRole('combobox')[0];
      fireEvent.change(dataSelect, { target: { value: '2024-01-01' } });
      
      await waitFor(() => {
        const empresaSelect = screen.getAllByRole('combobox')[1];
        expect(empresaSelect).not.toBeDisabled();
      });
    });

    it('deve habilitar Usinas ao selecionar Empresa', async () => {
      render(<IR1 />);
      
      const dataSelect = screen.getAllByRole('combobox')[0];
      fireEvent.change(dataSelect, { target: { value: '2024-01-01' } });
      
      await waitFor(() => {
        const empresaSelect = screen.getAllByRole('combobox')[1];
        fireEvent.change(empresaSelect, { target: { value: 'Empresa A' } });
      });
      
      await waitFor(() => {
        const usinaSelect = screen.getAllByRole('combobox')[2];
        expect(usinaSelect).not.toBeDisabled();
      });
    });

    it('deve carregar valor ao selecionar Usina', async () => {
      render(<IR1 />);
      
      const dataSelect = screen.getAllByRole('combobox')[0];
      fireEvent.change(dataSelect, { target: { value: '2024-01-01' } });
      
      await waitFor(() => {
        const empresaSelect = screen.getAllByRole('combobox')[1];
        fireEvent.change(empresaSelect, { target: { value: 'Empresa A' } });
      });
      
      await waitFor(() => {
        const usinaSelect = screen.getAllByRole('combobox')[2];
        fireEvent.change(usinaSelect, { target: { value: 'Usina 1' } });
      });
      
      await waitFor(() => {
        const valorInput = screen.getByPlaceholderText(/Nível de Partida/i);
        expect(valorInput).toHaveValue(100.5);
      });
    });
  });

  describe('Salvamento', () => {
    it('deve exibir botão Salvar ao selecionar Usina', async () => {
      render(<IR1 />);
      
      const dataSelect = screen.getAllByRole('combobox')[0];
      fireEvent.change(dataSelect, { target: { value: '2024-01-01' } });
      
      await waitFor(() => {
        const empresaSelect = screen.getAllByRole('combobox')[1];
        fireEvent.change(empresaSelect, { target: { value: 'Empresa A' } });
      });
      
      await waitFor(() => {
        const usinaSelect = screen.getAllByRole('combobox')[2];
        fireEvent.change(usinaSelect, { target: { value: 'Usina 1' } });
      });
      
      await waitFor(() => {
        const saveButton = screen.getByRole('button', { name: /salvar/i });
        expect(saveButton).toBeInTheDocument();
      });
    });

    it('deve salvar dados', async () => {
      const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});
      
      render(<IR1 />);
      
      const dataSelect = screen.getAllByRole('combobox')[0];
      fireEvent.change(dataSelect, { target: { value: '2024-01-01' } });
      
      await waitFor(() => {
        const empresaSelect = screen.getAllByRole('combobox')[1];
        fireEvent.change(empresaSelect, { target: { value: 'Empresa A' } });
      });
      
      await waitFor(() => {
        const usinaSelect = screen.getAllByRole('combobox')[2];
        fireEvent.change(usinaSelect, { target: { value: 'Usina 1' } });
      });
      
      await waitFor(() => {
        const saveButton = screen.getByRole('button', { name: /salvar/i });
        fireEvent.click(saveButton);
      });
      
      await waitFor(() => {
        expect(alertSpy).toHaveBeenCalledWith('Nível de Partida salvo com sucesso!');
      });
      
      alertSpy.mockRestore();
    });
  });
});
