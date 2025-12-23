import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import UserRegistry from '../../src/pages/Admin/Users/UserRegistry';

// Mock fetch for API calls
global.fetch = vi.fn();

describe('UserRegistry', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders page title', () => {
      render(<UserRegistry />);
      expect(screen.getByTestId('user-registry-title')).toHaveTextContent('Cadastro de Usuários');
    });

    it('renders form fields', () => {
      render(<UserRegistry />);
      expect(screen.getByTestId('user-registry-input-login')).toBeInTheDocument();
      expect(screen.getByTestId('user-registry-input-nome')).toBeInTheDocument();
      expect(screen.getByTestId('user-registry-input-email')).toBeInTheDocument();
      expect(screen.getByTestId('user-registry-input-telefone')).toBeInTheDocument();
    });

    it('renders action buttons', () => {
      render(<UserRegistry />);
      expect(screen.getByTestId('user-registry-btn-search')).toBeInTheDocument();
      expect(screen.getByTestId('user-registry-btn-edit')).toBeInTheDocument();
      expect(screen.getByTestId('user-registry-btn-save')).toBeInTheDocument();
      expect(screen.getByTestId('user-registry-btn-delete')).toBeInTheDocument();
      expect(screen.getByTestId('user-registry-btn-cancel')).toBeInTheDocument();
    });

    it('renders table with headers', () => {
      render(<UserRegistry />);
      expect(screen.getByText('Login')).toBeInTheDocument();
      expect(screen.getByText('Nome')).toBeInTheDocument();
      expect(screen.getByText('E-mail')).toBeInTheDocument();
      expect(screen.getByText('Telefone')).toBeInTheDocument();
    });
  });

  describe('Form interactions', () => {
    it('updates form data when inputs change', () => {
      render(<UserRegistry />);

      const loginInput = screen.getByTestId('user-registry-input-login');
      const nomeInput = screen.getByTestId('user-registry-input-nome');
      const emailInput = screen.getByTestId('user-registry-input-email');
      const telefoneInput = screen.getByTestId('user-registry-input-telefone');

      fireEvent.change(loginInput, { target: { value: 'testuser' } });
      fireEvent.change(nomeInput, { target: { value: 'Test User' } });
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.change(telefoneInput, { target: { value: '11999999999' } });

      expect(loginInput).toHaveValue('testuser');
      expect(nomeInput).toHaveValue('Test User');
      expect(emailInput).toHaveValue('test@example.com');
      expect(telefoneInput).toHaveValue('11999999999');
    });

    it('enforces max length on inputs', () => {
      render(<UserRegistry />);

      const loginInput = screen.getByTestId('user-registry-input-login');
      const nomeInput = screen.getByTestId('user-registry-input-nome');

      fireEvent.change(loginInput, { target: { value: 'verylongusername' } });
      fireEvent.change(nomeInput, { target: { value: 'A'.repeat(50) } });

      expect(loginInput).toHaveValue('verylong'); // Should be truncated to 8 chars
      expect(nomeInput).toHaveValue('A'.repeat(40)); // Should be truncated to 40 chars
    });
  });

  describe('Table interactions', () => {
    it('displays users in table after loading', async () => {
      render(<UserRegistry />);

      await waitFor(() => {
        expect(screen.getByTestId('user-registry-login-1')).toBeInTheDocument();
      });

      expect(screen.getByTestId('user-registry-login-1')).toHaveTextContent('user1');
      expect(screen.getByTestId('user-registry-nome-1')).toHaveTextContent('Usuário Um');
    });

    it('allows selecting individual users', async () => {
      render(<UserRegistry />);

      await waitFor(() => {
        expect(screen.getByTestId('user-registry-checkbox-1')).toBeInTheDocument();
      });

      const checkbox = screen.getByTestId('user-registry-checkbox-1');
      fireEvent.click(checkbox);

      expect(checkbox).toBeChecked();
    });

    it('allows selecting all users', async () => {
      render(<UserRegistry />);

      await waitFor(() => {
        expect(screen.getByTestId('user-registry-select-all')).toBeInTheDocument();
      });

      const selectAllCheckbox = screen.getByTestId('user-registry-select-all');
      fireEvent.click(selectAllCheckbox);

      // Should check all individual checkboxes
      const checkboxes = screen.getAllByTestId(/^user-registry-checkbox-/);
      checkboxes.forEach(checkbox => {
        expect(checkbox).toBeChecked();
      });
    });
  });

  describe('Action buttons', () => {
    it('enables edit button when one user is selected', async () => {
      render(<UserRegistry />);

      await waitFor(() => {
        expect(screen.getByTestId('user-registry-checkbox-1')).toBeInTheDocument();
      });

      const editButton = screen.getByTestId('user-registry-btn-edit');
      expect(editButton).toBeDisabled();

      const checkbox = screen.getByTestId('user-registry-checkbox-1');
      fireEvent.click(checkbox);

      expect(editButton).toBeEnabled();
    });

    it('enables delete button when users are selected', async () => {
      render(<UserRegistry />);

      await waitFor(() => {
        expect(screen.getByTestId('user-registry-checkbox-1')).toBeInTheDocument();
      });

      const deleteButton = screen.getByTestId('user-registry-btn-delete');
      expect(deleteButton).toBeDisabled();

      const checkbox = screen.getByTestId('user-registry-checkbox-1');
      fireEvent.click(checkbox);

      expect(deleteButton).toBeEnabled();
    });

    it('enables save button when required fields are filled', () => {
      render(<UserRegistry />);

      const saveButton = screen.getByTestId('user-registry-btn-save');
      expect(saveButton).toBeDisabled();

      const loginInput = screen.getByTestId('user-registry-input-login');
      const nomeInput = screen.getByTestId('user-registry-input-nome');

      fireEvent.change(loginInput, { target: { value: 'testuser' } });
      fireEvent.change(nomeInput, { target: { value: 'Test User' } });

      expect(saveButton).toBeEnabled();
    });

    it('clears form when cancel is clicked', () => {
      render(<UserRegistry />);

      const loginInput = screen.getByTestId('user-registry-input-login');
      const nomeInput = screen.getByTestId('user-registry-input-nome');
      const cancelButton = screen.getByTestId('user-registry-btn-cancel');

      fireEvent.change(loginInput, { target: { value: 'testuser' } });
      fireEvent.change(nomeInput, { target: { value: 'Test User' } });

      fireEvent.click(cancelButton);

      expect(loginInput).toHaveValue('');
      expect(nomeInput).toHaveValue('');
    });
  });

  describe('Pagination', () => {
    it('displays pagination controls', async () => {
      render(<UserRegistry />);

      await waitFor(() => {
        expect(screen.getByTestId('user-registry-pagination')).toBeInTheDocument();
      });

      expect(screen.getByTestId('user-registry-prev-page')).toBeInTheDocument();
      expect(screen.getByTestId('user-registry-next-page')).toBeInTheDocument();
      expect(screen.getByTestId('user-registry-page-info')).toBeInTheDocument();
    });

    it('disables previous button on first page', async () => {
      render(<UserRegistry />);

      await waitFor(() => {
        expect(screen.getByTestId('user-registry-prev-page')).toBeInTheDocument();
      });

      const prevButton = screen.getByTestId('user-registry-prev-page');
      expect(prevButton).toBeDisabled();
    });
  });

  describe('Data-testid attributes', () => {
    it('has all required data-testid attributes', () => {
      render(<UserRegistry />);

      expect(screen.getByTestId('user-registry-container')).toBeInTheDocument();
      expect(screen.getByTestId('user-registry-header')).toBeInTheDocument();
      expect(screen.getByTestId('user-registry-title')).toBeInTheDocument();
      expect(screen.getByTestId('user-registry-form')).toBeInTheDocument();
      expect(screen.getByTestId('user-registry-table-container')).toBeInTheDocument();
      expect(screen.getByTestId('user-registry-actions')).toBeInTheDocument();
    });
  });
});