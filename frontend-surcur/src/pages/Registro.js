import React, { useState } from 'react';
import { useNavigate } from 'react-router';

const Registro = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nombre: '',
    apellidos: '',
    correo: '',
    contrasena: '',
    numero_control: '',
  });

  const [errors, setErrors] = useState({});

  const validarFormulario = () => {
    const newErrors = {};

    // Nombre: letras y espacios, 2-30 caracteres
    if (!form.nombre.trim()) {
      newErrors.nombre = 'El nombre es obligatorio.';
    } else if (!/^[A-Za-zÁÉÍÓÚÑáéíóúñ\s]{2,30}$/.test(form.nombre)) {
      newErrors.nombre = 'El nombre solo debe contener letras y espacios (2-30 caracteres).';
    }

    // Apellidos: letras y espacios, 2-50 caracteres
    if (!form.apellidos.trim()) {
      newErrors.apellidos = 'Los apellidos son obligatorios.';
    } else if (!/^[A-Za-zÁÉÍÓÚÑáéíóúñ\s]{2,50}$/.test(form.apellidos)) {
      newErrors.apellidos = 'Los apellidos solo deben contener letras y espacios (2-50 caracteres).';
    }

    // Correo
    if (!form.correo.trim()) {
      newErrors.correo = 'El correo es obligatorio.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.correo)) {
      newErrors.correo = 'Formato de correo no válido.';
    } else if (form.correo.length < 5 || form.correo.length > 50) {
      newErrors.correo = 'El correo debe tener entre 5 y 50 caracteres.';
    }

    // Contraseña: 8-20 caracteres, sin espacios
    if (!form.contrasena) {
      newErrors.contrasena = 'La contraseña es obligatoria.';
    } else if (form.contrasena.length < 8 || form.contrasena.length > 20) {
      newErrors.contrasena = 'La contraseña debe tener entre 8 y 20 caracteres.';
    } else if (/\s/.test(form.contrasena)) {
      newErrors.contrasena = 'La contraseña no debe contener espacios.';
    }

    // Número de control: 1 letra + 8 dígitos
    if (!form.numero_control.trim()) {
      newErrors.numero_control = 'El número de control es obligatorio.';
    } else if (!/^[a-zA-Z]{1}[0-9]{8}$/.test(form.numero_control)) {
      newErrors.numero_control = 'El número de control debe comenzar con una letra seguida de 8 dígitos (ej. s21120229).';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' }); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validarFormulario()) return;

    try {
      const response = await fetch('http://localhost/backend-surcur/api/registro.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await response.json();
      alert(data.message);

      if (data.success) {
        navigate('/');
      }
    } catch {
      alert('Error de conexión con el servidor');
    }
  };

  return (
    <div className="container mt-5">
      <div className="card mx-auto shadow" style={{ maxWidth: '600px' }}>
        <div className="card-body">
          <h3 className="card-title text-center mb-4">Registro de Usuario</h3>
          <form onSubmit={handleSubmit} noValidate autoComplete="off">
            <div className="mb-3">
              <label className="form-label">Nombre</label>
              <input
                type="text"
                name="nombre"
                autoComplete="off"
                className={`form-control ${errors.nombre ? 'is-invalid' : ''}`}
                value={form.nombre}
                onChange={handleChange}
              />
              {errors.nombre && <div className="invalid-feedback">{errors.nombre}</div>}
            </div>
            <div className="mb-3">
              <label className="form-label">Apellidos</label>
              <input
                type="text"
                name="apellidos"
                autoComplete="off"
                className={`form-control ${errors.apellidos ? 'is-invalid' : ''}`}
                value={form.apellidos}
                onChange={handleChange}
              />
              {errors.apellidos && <div className="invalid-feedback">{errors.apellidos}</div>}
            </div>
            <div className="mb-3">
              <label className="form-label">Correo</label>
              <input
                type="email"
                name="correo"
                autoComplete="off"
                className={`form-control ${errors.correo ? 'is-invalid' : ''}`}
                value={form.correo}
                onChange={handleChange}
              />
              {errors.correo && <div className="invalid-feedback">{errors.correo}</div>}
            </div>
            <div className="mb-3">
              <label className="form-label">Contraseña</label>
              <input
                type="password"
                name="contrasena"
                autoComplete="off"
                className={`form-control ${errors.contrasena ? 'is-invalid' : ''}`}
                value={form.contrasena}
                onChange={handleChange}
              />
              {errors.contrasena && <div className="invalid-feedback">{errors.contrasena}</div>}
            </div>
            <div className="mb-3">
              <label className="form-label">Número de Control</label>
              <input
                type="text"
                name="numero_control"
                autoComplete="off"
                className={`form-control ${errors.numero_control ? 'is-invalid' : ''}`}
                value={form.numero_control}
                onChange={handleChange}
              />
              {errors.numero_control && <div className="invalid-feedback">{errors.numero_control}</div>}
            </div>
            <div className="d-grid">
              <button type="submit" className="btn btn-success">Registrar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registro;
