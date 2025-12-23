/**
 * Testes para Electrical.tsx
 * Migração de: legado/pdpw/frmColEletrica.aspx
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Electrical from '../../src/pages/Collection/Electrical/Electrical';

describe('Electrical', () => {
  describe('Renderização Inicial', () => {
    it('deve renderizar o título da página', () => {
      render(<Electrical />);
      expect(screen.getByTestId('page-title')).toHaveTextContent('Razão Elétrica Transformada');
    });

    it('deve renderizar o subtítulo da página', () => {
      render(<Electrical />);
      expect(screen.getByTestId('page-subtitle')).toHaveTextContent(
        'Coleta de dados elétricos de usinas'
      );
    });

    it('deve renderizar o container principal', () => {
      render(<Electrical />);
      expect(screen.getByTestId('electrical-container')).toBeInTheDocument();
    });

    it('deve renderizar todos os campos do formulário', () => {
      render(<Electrical />);

      expect(screen.getByTestId('label-data-pdp')).toHaveTextContent('Data PDP:');
      expect(screen.getByTestId('select-data-pdp')).toBeInTheDocument();

      expect(screen.getByTestId('label-empresa')).toHaveTextContent('Empresa:');
      expect(screen.getByTestId('select-empresa')).toBeInTheDocument();

      expect(screen.getByTestId('label-usina')).toHaveTextContent('Usina:');
      expect(screen.getByTestId('select-usina')).toBeInTheDocument();
    });

    it('deve desabilitar select de empresa quando data não está selecionada', () => {
      render(<Electrical />);
      const selectEmpresa = screen.getByTestId('select-empresa') as HTMLSelectElement;
      expect(selectEmpresa.disabled).toBe(true);
    });

    it('deve desabilitar select de usina quando empresa não está selecionada', () => {
      render(<Electrical />);
      const selectUsina = screen.getByTestId('select-usina') as HTMLSelectElement;
      expect(selectUsina.disabled).toBe(true);
    });
  });

  describe('Estado Vazio', () => {
    it('não deve exibir mensagem de estado vazio inicialmente', () => {
      render(<Electrical />);
      expect(screen.queryByTestId('empty-state')).not.toBeInTheDocument();
    });

    it('não deve exibir tabela de dados inicialmente', () => {
      render(<Electrical />);
      expect(screen.queryByTestId('data-table')).not.toBeInTheDocument();
    });
  });
});
