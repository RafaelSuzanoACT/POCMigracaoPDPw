import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import UserAssociation from '../../src/pages/Admin/Users/UserAssociation';

// Mock fetch for API calls
global.fetch = vi.fn();

describe('UserAssociation', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders page title', () => {
      render(<UserAssociation />);
      expect(screen.getByTestId('user-association-title')).toHaveTextContent('Associação de Usuários');
    });

    it('renders selection form', () => {
      render(<UserAssociation />);
      expect(screen.getByTestId('user-association-select-company')).toBeInTheDocument();
      expect(screen.getByTestId('user-association-select-user')).toBeInTheDocument();
    });

    it('renders action buttons', () => {
      render(<UserAssociation />);
      expect(screen.getByTestId('user-association-btn-include')).toBeInTheDocument();
      expect(screen.getByTestId('user-association-btn-exclude')).toBeInTheDocument();
    });

    it('renders table with headers', () => {
      render(<UserAssociation />);
      expect(screen.getByText('Empresa')).toBeInTheDocument();
      expect(screen.getByText('Usuário')).toBeInTheDocument();
    });
  });

  describe('Selection form', () => {
    it('loads companies and users on mount', async () => {
      render(<UserAssociation />);

      await waitFor(() => {
        const companySelect = screen.getByTestId('user-association-select-company');
        expect(companySelect).toBeInTheDocument();
      });

      // Check if options are loaded (mock data)
      const companySelect = screen.getByTestId('user-association-select-company') as HTMLSelectElement;
      expect(companySelect.options.length).toBeGreaterThan(1);
    });

    it('updates selected company when changed', () => {
      render(<UserAssociation />);

      const companySelect = screen.getByTestId('user-association-select-company') as HTMLSelectElement;

      fireEvent.change(companySelect, { target: { value: '1' } });
      expect(companySelect.value).toBe('1');
    });

    it('updates selected user when changed', () => {
      render(<UserAssociation />);

      const userSelect = screen.getByTestId('user-association-select-user') as HTMLSelectElement;

      fireEvent.change(userSelect, { target: { value: '1' } });
      expect(userSelect.value).toBe('1');
    });
  });

  describe('Table interactions', () => {
    it('displays associations in table after loading', async () => {
      render(<UserAssociation />);

      await waitFor(() => {
        expect(screen.getByTestId('user-association-empresa-1')).toBeInTheDocument();
      });

      expect(screen.getByTestId('user-association-empresa-1')).toHaveTextContent('ONS');
      expect(screen.getByTestId('user-association-usuario-1')).toHaveTextContent('João Silva');
    });

    it('allows selecting individual associations', async () => {
      render(<UserAssociation />);

      await waitFor(() => {
        expect(screen.getByTestId('user-association-checkbox-1')).toBeInTheDocument();
      });

      const checkbox = screen.getByTestId('user-association-checkbox-1');
      fireEvent.click(checkbox);

      expect(checkbox).toBeChecked();
    });

    it('allows selecting all associations', async () => {
      render(<UserAssociation />);

      await waitFor(() => {
        expect(screen.getByTestId('user-association-select-all')).toBeInTheDocument();
      });

      const selectAllCheckbox = screen.getByTestId('user-association-select-all');
      fireEvent.click(selectAllCheckbox);

      // Should check all individual checkboxes
      const checkboxes = screen.getAllByTestId(/^user-association-checkbox-/);
      checkboxes.forEach(checkbox => {
        expect(checkbox).toBeChecked();
      });
    });
  });

  describe('Action buttons', () => {
    it('enables include button when company and user are selected', () => {
      render(<UserAssociation />);

      const includeButton = screen.getByTestId('user-association-btn-include');
      expect(includeButton).toBeDisabled();

      const companySelect = screen.getByTestId('user-association-select-company');
      const userSelect = screen.getByTestId('user-association-select-user');

      fireEvent.change(companySelect, { target: { value: '1' } });
      fireEvent.change(userSelect, { target: { value: '1' } });

      expect(includeButton).toBeEnabled();
    });

    it('enables exclude button when associations are selected', async () => {
      render(<UserAssociation />);

      await waitFor(() => {
        expect(screen.getByTestId('user-association-checkbox-1')).toBeInTheDocument();
      });

      const excludeButton = screen.getByTestId('user-association-btn-exclude');
      expect(excludeButton).toBeDisabled();

      const checkbox = screen.getByTestId('user-association-checkbox-1');
      fireEvent.click(checkbox);

      expect(excludeButton).toBeEnabled();
    });

    it('shows alert when trying to include without selections', () => {
      const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {});
      render(<UserAssociation />);

      const includeButton = screen.getByTestId('user-association-btn-include');
      fireEvent.click(includeButton);

      expect(alertMock).toHaveBeenCalledWith('Selecione uma empresa e um usuário para incluir.');
      alertMock.mockRestore();
    });

    it('shows alert when trying to exclude without selections', () => {
      const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {});
      render(<UserAssociation />);

      const excludeButton = screen.getByTestId('user-association-btn-exclude');
      fireEvent.click(excludeButton);

      expect(alertMock).toHaveBeenCalledWith('Selecione pelo menos uma associação para excluir.');
      alertMock.mockRestore();
    });
  });

  describe('Pagination', () => {
    it('displays pagination controls', async () => {
      render(<UserAssociation />);

      await waitFor(() => {
        expect(screen.getByTestId('user-association-pagination')).toBeInTheDocument();
      });

      expect(screen.getByTestId('user-association-prev-page')).toBeInTheDocument();
      expect(screen.getByTestId('user-association-next-page')).toBeInTheDocument();
      expect(screen.getByTestId('user-association-page-info')).toBeInTheDocument();
    });

    it('disables previous button on first page', async () => {
      render(<UserAssociation />);

      await waitFor(() => {
        expect(screen.getByTestId('user-association-prev-page')).toBeInTheDocument();
      });

      const prevButton = screen.getByTestId('user-association-prev-page');
      expect(prevButton).toBeDisabled();
    });
  });

  describe('Data-testid attributes', () => {
    it('has all required data-testid attributes', () => {
      render(<UserAssociation />);

      expect(screen.getByTestId('user-association-container')).toBeInTheDocument();
      expect(screen.getByTestId('user-association-header')).toBeInTheDocument();
      expect(screen.getByTestId('user-association-title')).toBeInTheDocument();
      expect(screen.getByTestId('user-association-selection-form')).toBeInTheDocument();
      expect(screen.getByTestId('user-association-table-container')).toBeInTheDocument();
      expect(screen.getByTestId('user-association-actions')).toBeInTheDocument();
    });
  });
});