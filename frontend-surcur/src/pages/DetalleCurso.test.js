import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useParams, useNavigate } from 'react-router';
import DetalleCurso from './DetalleCurso';

jest.mock('react-router', () => ({
  useParams: jest.fn(),
  useNavigate: jest.fn(),
}));

global.fetch = jest.fn();
window.alert = jest.fn();

describe('Componente DetalleCurso', () => {
  const navigateMock = jest.fn();
  const mockParams = { id: '1' };

  beforeEach(() => {
    useParams.mockReturnValue(mockParams);
    useNavigate.mockReturnValue(navigateMock);
    fetch.mockClear();
    window.alert.mockClear();
  });

  test('muestra errores si el título, descripción o enlace están vacíos', () => {
    render(<DetalleCurso />);
    fireEvent.click(screen.getByText('Crear capítulo'));

    expect(screen.getByText(/El título debe tener entre 5 y 100 caracteres/i)).toBeInTheDocument();
    expect(screen.getByText(/La descripción debe tener entre 10 y 500 caracteres/i)).toBeInTheDocument();
    expect(screen.getByText(/El enlace debe comenzar con/i)).toBeInTheDocument();
  });

  test('redirige a /curso-completo/:id al hacer clic en el botón', () => {
    render(<DetalleCurso />);
    fireEvent.click(screen.getByText('Ir a curso completo'));
    expect(navigateMock).toHaveBeenCalledWith('/curso-completo/1');
  });
}); 