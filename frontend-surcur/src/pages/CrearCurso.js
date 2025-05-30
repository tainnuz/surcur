import React, { useState, useEffect } from 'react';
import imagenCurso from '../assets/img/curso.png';
import { Link } from 'react-router';

function CrearCurso() {
  const [formData, setFormData] = useState({
    nombre: '',
    carrera: ''
  });

  const [errors, setErrors] = useState({});
  const [cursos, setCursos] = useState([]);

  const validarFormulario = () => {
    const newErrors = {};
    const nombreRegex = /^[a-zA-Z0-9\s.,\-()!?:]+$/;

    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre del curso es obligatorio.';
    } else if (formData.nombre.length < 5 || formData.nombre.length > 100) {
      newErrors.nombre = 'El nombre debe tener entre 5 y 100 caracteres.';
    } else if (!nombreRegex.test(formData.nombre)) {
      newErrors.nombre = 'El nombre solo puede contener letras, números y signos de puntuación básicos.';
    }

    if (!formData.carrera) {
      newErrors.carrera = 'Debes seleccionar una carrera.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validarFormulario()) return;

    try {
      const response = await fetch('http://localhost/backend-surcur/api/crear_curso.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const result = await response.json();
      if (result.success) {
        alert('Curso creado exitosamente.');
        setFormData({ nombre: '', carrera: '' });
        fetchCursos();
      } else {
        alert('Error al crear el curso: ' + result.message);
      }
    } catch (error) {
      console.error(error);
      alert('Error de conexión con el servidor.');
    }
  };

  const fetchCursos = async () => {
    try {
      const response = await fetch('http://localhost/backend-surcur/api/obtener_cursos.php');
      const data = await response.json();
      setCursos(data);
    } catch (error) {
      console.error('Error al obtener cursos:', error);
    }
  };

  useEffect(() => {
    fetchCursos();
  }, []);

  return (
    <div className="container mt-5">
      <h2>Creación de un curso</h2>
      <form onSubmit={handleSubmit} className="mt-4" noValidate autoComplete="off">
        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">Nombre del curso</label>
            <input
              type="text"
              name="nombre"
              className={`form-control ${errors.nombre ? 'is-invalid' : ''}`}
              value={formData.nombre}
              onChange={handleChange}
              autoComplete="off"
              required
            />
            {errors.nombre && <div className="invalid-feedback">{errors.nombre}</div>}
          </div>

          <div className="col-md-6">
            <label className="form-label">Carrera</label>
            <select
              name="carrera"
              className={`form-select ${errors.carrera ? 'is-invalid' : ''}`}
              value={formData.carrera}
              onChange={handleChange}
              autoComplete="off"
              required
            >
              <option value="">Selecciona una carrera</option>
              <option value="Ing Sistemas Comp.">Ing Sistemas Comp.</option>
              <option value="Ing Electrónica">Ing Electrónica</option>
              <option value="Ing Ambiental">Ing Ambiental</option>
              <option value="Int Automotriz">Ing Automotriz</option>
              <option value="Ing Gestión Emp.">Ing Gestión Emp.</option>
              <option value="Gastronomía">Gastronomía</option>
            </select>
            {errors.carrera && <div className="invalid-feedback">{errors.carrera}</div>}
          </div>
        </div>

        <button type="submit" className="btn btn-success">Crear curso</button>
      </form>

      <hr className="my-5" />

      <h3>Cursos registrados</h3>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-4 mt-3">
        {cursos.map((curso, index) => (
          <div className="col" key={index}>
            <div className="card h-100 shadow-sm">
              <img src={imagenCurso} className="card-img-top" alt="Imagen del curso" />
              <div className="card-body">
                <h5 className="card-title">{curso.nombre}</h5>
                <p className="card-text text-muted">{curso.carrera}</p>
                <Link to={`/curso/${curso.id}`} className="btn btn-primary">
                  Ir al curso
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CrearCurso;

