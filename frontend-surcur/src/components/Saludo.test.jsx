// src/components/Saludo.test.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import Saludo from './Saludo';

test('muestra el nombre recibido como saludo', () => {
  render(<Saludo nombre="Gabriel" />);
  const saludo = screen.getByText(/hola, gabriel/i);
  expect(saludo).toBeInTheDocument();
});
