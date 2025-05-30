import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router';

function DetalleCurso() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [enlace, setEnlace] = useState('');
  const [errores, setErrores] = useState({});

  const validarCampos = () => {
    const nuevosErrores = {};

    const regexTexto = /^[\w\s.,;:!?()"\-]{5,100}$/;
    //const regexDescripcion = /^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9\s.,;:!?()"'¿¡\-]{10,500}$/;
    const regexYoutube = /^https:\/\/www\.youtube\.com\/watch.*/;

    if (!regexTexto.test(titulo)) {
      nuevosErrores.titulo = 'El título debe tener entre 5 y 100 caracteres y solo contener letras, números y signos de puntuación comunes.';
    }

  if (descripcion.length < 10 || descripcion.length > 500) {
    nuevosErrores.descripcion = 'La descripción debe tener entre 10 y 500 caracteres.';
  }

    if (!regexYoutube.test(enlace)) {
      nuevosErrores.enlace = 'El enlace debe comenzar con "https://www.youtube.com/watch".';
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleCrearCapitulo = async (e) => {
    e.preventDefault();

    if (!validarCampos()) return;

    const capitulo = {
      titulo,
      descripcion,
      enlace,
      curso_id: id
    };

    try {
      const res = await fetch('http://localhost/backend-surcur/api/crear_capitulo.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(capitulo)
      });

      const result = await res.json();
      if (result.success) {
        alert('Capítulo creado exitosamente.');
        setTitulo('');
        setDescripcion('');
        setEnlace('');
        setErrores({});
      } else {
        alert('Error: ' + result.message);
      }
    } catch (error) {
      alert('Error de conexión al servidor.');
      console.error(error);
    }
  };

  const irCursoCompleto = () => {
    navigate(`/curso-completo/${id}`);
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Crear capítulo para el curso #{id}</h2>

      <form onSubmit={handleCrearCapitulo} className="border p-4 rounded shadow-sm">
        <div className="mb-3">
          <label className="form-label">Título del capítulo</label>
          <input
            type="text"
            className={`form-control ${errores.titulo ? 'is-invalid' : ''}`}
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            autoComplete="off"
            required
          />
          {errores.titulo && <div className="invalid-feedback">{errores.titulo}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Descripción</label>
          <textarea
            className={`form-control ${errores.descripcion ? 'is-invalid' : ''}`}
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            autoComplete="off"
            required
          ></textarea>
          {errores.descripcion && <div className="invalid-feedback">{errores.descripcion}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Enlace de YouTube</label>
          <input
            type="url"
            className={`form-control ${errores.enlace ? 'is-invalid' : ''}`}
            value={enlace}
            onChange={(e) => setEnlace(e.target.value)}
            autoComplete="off"
            required
          />
          {errores.enlace && <div className="invalid-feedback">{errores.enlace}</div>}
        </div>

        <button type="submit" className="btn btn-primary">Crear capítulo</button>
      </form>

      <div className="mt-3">
        <button className="btn btn-secondary" onClick={irCursoCompleto}>
          Ir a curso completo
        </button>
      </div>
    </div>
  );
}

export default DetalleCurso;

