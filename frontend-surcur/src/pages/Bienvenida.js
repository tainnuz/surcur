/*import React from 'react';

const Bienvenida = () => {
  const usuario = JSON.parse(localStorage.getItem('usuario'));

  return (
    <div className="container mt-5 text-center">
      <h2>¡Bienvenido, {usuario?.nombre} {usuario?.apellidos}!</h2>
      <p>Correo: {usuario?.correo}</p>
      <p>Número de Control: {usuario?.numero_control}</p>
    </div>
  );
};

export default Bienvenida;*/

// src/pages/Bienvenida.js
import React from 'react';
import { useNavigate } from 'react-router';

function Bienvenida() {
  const navigate = useNavigate();

  const irACrearCurso = () => {
    navigate('/crear-curso');
  };

  return (
    <div className="container mt-5">
      <h2>¡Bienvenido a Surcur!</h2>
      <p>Has iniciado sesión correctamente.</p>
      <button className="btn btn-primary mt-4" onClick={irACrearCurso}>
        Creación de cursos
      </button>
    </div>
  );
}

export default Bienvenida;

