import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useNavigate } from 'react-router';
import Registro from './Registro';

jest.mock('react-router', () => ({
  useNavigate: jest.fn(),
}));

jest.spyOn(window, 'alert').mockImplementation(() => {});
global.fetch = jest.fn(); 

describe('Componente Registro', () => {
  const navigateMock = jest.fn();

  beforeEach(() => {
    useNavigate.mockReturnValue(navigateMock);
    fetch.mockClear();
  });

  test('muestra errores si el formulario está vacío', () => {
    render(<Registro />);
    fireEvent.click(screen.getByText('Registrar'));

    expect(screen.getByText('El nombre es obligatorio.')).toBeInTheDocument();
    expect(screen.getByText('Los apellidos son obligatorios.')).toBeInTheDocument();
  });

  test('rechaza formato inválido en número de control', () => {
    render(<Registro />);
    
    fireEvent.change(screen.getByLabelText('Número de Control'), {
      target: { value: '123', name: 'numero_control' },
    });
    
    fireEvent.click(screen.getByText('Registrar'));
    expect(screen.getByText(/debe comenzar con una letra seguida de 8 dígitos/i)).toBeInTheDocument();
  });

  test('envía el formulario correctamente', async () => {
    fetch.mockResolvedValueOnce({ json: () => ({ success: true, message: 'Éxito' }) });
    
    render(<Registro />);
    
    fireEvent.change(screen.getByLabelText('Nombre'), { target: { value: 'Ana', name: 'nombre' } });
    fireEvent.change(screen.getByLabelText('Número de Control'), { target: { value: 's12345678', name: 'numero_control' } });
    
    fireEvent.click(screen.getByText('Registrar'));

    await (() => {
      expect(fetch).toHaveBeenCalled();
      expect(navigateMock).toHaveBeenCalledWith('/');
    });
  });
});