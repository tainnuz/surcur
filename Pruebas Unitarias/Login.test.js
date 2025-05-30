import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useNavigate } from 'react-router';
import Login from './Login';


jest.mock('react-router', () => ({
  useNavigate: jest.fn(),
}));

jest.spyOn(window, 'alert').mockImplementation(() => {}); 
global.fetch = jest.fn();
Storage.prototype.setItem = jest.fn();

describe('Componente Login', () => {
  const navigateMock = jest.fn();

  beforeEach(() => {
    useNavigate.mockReturnValue(navigateMock);
    fetch.mockClear();
    localStorage.setItem.mockClear();
  });

  test('muestra errores si el correo y contraseña están vacíos', () => {
    render(<Login />);

    fireEvent.click(screen.getByRole('button', { name: 'Iniciar Sesión' }));

    expect(screen.getByText('El correo es obligatorio.')).toBeInTheDocument();
    expect(screen.getByText('La contraseña es obligatoria.')).toBeInTheDocument();
  });


  test('rechaza correo con formato inválido', () => {
    render(<Login />);
    
    fireEvent.change(screen.getByLabelText('Correo'), {
      target: { value: 'correo-invalido', name: 'correo' },
    });
    
    fireEvent.click(screen.getByText('Iniciar Sesión'));
    expect(screen.getByText('Formato de correo no válido.')).toBeInTheDocument();
  });

  test('inicia sesión y redirige a /bienvenida', async () => {
    fetch.mockResolvedValueOnce({
      json: () => ({ 
        success: true, 
        message: 'Inicio de sesión exitoso',
        usuario: { nombre: 'Test User' }
      }),
    });

    render(<Login />);
    
    fireEvent.change(screen.getByLabelText('Correo'), {
      target: { value: 'usuario@example.com', name: 'correo' },
    });
    fireEvent.change(screen.getByLabelText('Contraseña'), {
      target: { value: 'password123', name: 'contrasena' },
    });
    
    fireEvent.click(screen.getByText('Iniciar Sesión'));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        'http://localhost/backend-surcur/api/login.php',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify({
            correo: 'usuario@example.com',
            contrasena: 'password123',
          }),
        })
      );

      expect(localStorage.setItem).toHaveBeenCalledWith(
        'usuario',
        JSON.stringify({ nombre: 'Test User' })
      );

      expect(navigateMock).toHaveBeenCalledWith('/bienvenida');
    });
  });
});