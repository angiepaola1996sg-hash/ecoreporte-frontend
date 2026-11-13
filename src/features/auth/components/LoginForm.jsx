import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { CampoTexto } from '../../../components/ui/CampoTexto';
import { Boton } from '../../../components/ui/Boton';

/**
 * Formulario de inicio de sesión con validación de campos y credenciales.
 */
export function LoginForm() {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [errores, setErrores] = useState({});
  const [mensajeError, setMensajeError] = useState('');

  const { iniciarSesion } = useAuth();
  const navegar = useNavigate();

  function validarFormulario() {
    const nuevosErrores = {};
    if (!correo.trim()) {
      nuevosErrores.correo = 'El correo electrónico es obligatorio.';
    } else if (!/\S+@\S+\.\S+/.test(correo)) {
      nuevosErrores.correo = 'Ingrese un formato de correo válido.';
    }

    if (!contrasena) {
      nuevosErrores.contrasena = 'La contraseña es obligatoria.';
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  }

  function manejarEnvio(evento) {
    evento.preventDefault();
    setMensajeError('');

    if (!validarFormulario()) return;

    const resultado = iniciarSesion(correo, contrasena);
    if (!resultado.exito) {
      setMensajeError(resultado.mensaje);
      return;
    }

    navegar('/reportes');
  }

  return (
    <form onSubmit={manejarEnvio} className="tarjeta-formulario" noValidate>
      <h2 style={{ marginBottom: '0.5rem' }}>Iniciar Sesión en EcoReporte</h2>
      <p style={{ color: 'var(--color-texto-suave)', marginBottom: '1.25rem', fontSize: '0.9rem' }}>
        Ingresa con tus credenciales para reportar o gestionar incidencias ambientales.
      </p>

      {mensajeError && <div className="alerta-error">{mensajeError}</div>}

      <CampoTexto
        etiqueta="Correo electrónico"
        nombre="correo"
        tipo="email"
        valor={correo}
        onChange={(e) => setCorreo(e.target.value)}
        placeholder="ejemplo@ecoreporte.com"
        error={errores.correo}
        requerido
      />

      <CampoTexto
        etiqueta="Contraseña"
        nombre="contrasena"
        tipo="password"
        valor={contrasena}
        onChange={(e) => setContrasena(e.target.value)}
        placeholder="••••••••"
        error={errores.contrasena}
        requerido
      />

      <Boton tipo="submit" variante="primario" className="btn-ancho-completo">
        Ingresar
      </Boton>

      <div style={{ marginTop: '1.25rem', fontSize: '0.85rem', color: 'var(--color-texto-suave)' }}>
        <p><strong>Usuarios de prueba:</strong></p>
        <p>• Ciudadano: <code>ciudadano@ecoreporte.com</code> / <code>123456</code></p>
        <p>• Admin: <code>admin@ecoreporte.com</code> / <code>123456</code></p>
        <p>• Inactivo: <code>inactivo@ecoreporte.com</code> / <code>123456</code></p>
      </div>

      <p style={{ marginTop: '1rem', textAlign: 'center', fontSize: '0.9rem' }}>
        ¿No tienes cuenta? <Link to="/registro">Regístrate aquí</Link>
      </p>
    </form>
  );
}