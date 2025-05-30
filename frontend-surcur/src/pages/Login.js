import React, { useState } from 'react';
import { useNavigate } from 'react-router';

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ correo: '', contrasena: '' });
  const [errors, setErrors] = useState({});

  const validarFormulario = () => {
    const newErrors = {};

    if (!form.correo.trim()) {
      newErrors.correo = 'El correo es obligatorio.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.correo)) {
      newErrors.correo = 'Formato de correo no válido.';
    }

    if (!form.contrasena.trim()) {
      newErrors.contrasena = 'La contraseña es obligatoria.';
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
      const response = await fetch('http://localhost/backend-surcur/api/login.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await response.json();
      alert(data.message);

      if (data.success) {
        localStorage.setItem('usuario', JSON.stringify(data.usuario));
        navigate('/bienvenida');
      }
    } catch {
      alert('Error de conexión con el servidor');
    }
  };

  return (
    <div className="container mt-5">
      <div className="card mx-auto shadow" style={{ maxWidth: '500px' }}>
        <div className="card-body">
          <h3 className="card-title text-center mb-4">Iniciar Sesión</h3>
          <form onSubmit={handleSubmit} noValidate autoComplete="off">
            <div className="mb-3">
              <label className="form-label">Correo</label>
              <input
                type="email"
                name="correo"
                autoComplete="off"
                className={`form-control ${errors.correo ? 'is-invalid' : ''}`}
                value={form.correo}
                onChange={handleChange}
                required
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
                required
              />
              {errors.contrasena && <div className="invalid-feedback">{errors.contrasena}</div>}
            </div>
            <div className="d-grid mb-3">
              <button type="submit" className="btn btn-primary">Iniciar Sesión</button>
            </div>
          </form>
          <div className="d-grid">
            <button className="btn btn-secondary" onClick={() => navigate('/registro')}>
              Registro
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
