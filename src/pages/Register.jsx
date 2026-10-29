import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    contrasena: '',
    telefono: '',
    rol_id_rol: 1 // Rol por defecto (Ciudadano / Usuario)
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulación de guardado local para conectar luego con el API
    if (formData.nombre && formData.correo && formData.contrasena) {
      alert('¡Cuenta creada exitosamente! Ahora puedes iniciar sesión.');
      navigate('/');
    } else {
      alert('Por favor complete los campos obligatorios');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f4f6f8', padding: '1rem' }}>
      <div style={{ background: '#fff', padding: '2rem', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', width: '100%', maxWidth: '380px' }}>
        <h2 style={{ color: '#2e7d32', textAlign: 'center', marginBottom: '1.5rem' }}>Registro - Ecoreporte</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Nombre Completo:</label>
            <input 
              type="text" 
              name="nombre"
              value={formData.nombre} 
              onChange={handleChange} 
              required 
              style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Correo Electrónico:</label>
            <input 
              type="email" 
              name="correo"
              value={formData.correo} 
              onChange={handleChange} 
              required 
              style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Teléfono:</label>
            <input 
              type="tel" 
              name="telefono"
              value={formData.telefono} 
              onChange={handleChange} 
              style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Contraseña:</label>
            <input 
              type="password" 
              name="contrasena"
              value={formData.contrasena} 
              onChange={handleChange} 
              required 
              style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
            />
          </div>

          <button type="submit" style={{ width: '100%', padding: '0.75rem', backgroundColor: '#2e7d32', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
            Registrarse
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.9rem' }}>
          ¿Ya tienes cuenta? <Link to="/" style={{ color: '#2e7d32', textDecoration: 'none', fontWeight: 'bold' }}>Inicia sesión aquí</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;