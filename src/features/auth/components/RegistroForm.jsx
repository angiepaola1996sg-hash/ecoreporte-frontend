import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { CampoTexto } from '../../../components/ui/CampoTexto';
import { Boton } from '../../../components/ui/Boton';

/**
 * Formulario de registro de ciudadanos con validaciones de campos obligatorios y formato.
 */
export function RegistroForm() {
  const [formulario, setFormulario] = useState({
    nombre: '',
    correo: '',
    telefono: '',
    contrasena: '',
  });
  const [errores, setErrores] = useState({});
  const [mensajeError, setMensajeError] = useState('');

  const { registrarUsuario } = useAuth();
  const navegar = useNavigate();

  function manejarCambio(evento) {
    const { name, value } = evento.target;
    setFormulario((prev) => ({ ...prev, [name]: value }));
  }

  function validarFormulario() {
    const nuevosErrores = {};
    if (!formulario.nombre.trim() || formulario.nombre.trim().length < 3) {
      nuevosErrores.nombre = 'Ingrese su nombre completo (mínimo 3 caracteres).';
    }
    if (!formulario.correo.trim() || !/\S+@\S+\.\S+/.test(formulario.correo)) {
      nuevosErrores.correo = 'Ingrese un correo electrónico válido.';
    }
    if (formulario.telefono && !/^\d{7,15}$/.test(formulario.telefono.trim())) {
      nuevosErrores.telefono = 'El teléfono debe contener solo números (7 a 15 dígitos).';
    }
    if (!formulario.contrasena || formulario.contrasena.length < 6) {
      nuevosErrores.contrasena = 'La contraseña debe tener al menos 6 caracteres.';
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  }

  function manejarEnvio(evento) {
    evento.preventDefault();
    setMensajeError('');

    if (!validarFormulario()) return;

    const resultado = registrarUsuario(formulario);
    if (!resultado.exito) {
      setMensajeError(resultado.mensaje);
      return;
    }

    navegar('/login');
  }

  return (
    <form onSubmit={manejarEnvio} className="tarjeta-formulario" noValidate>
      <h2 style={{ marginBottom: '0.5rem' }}>Registro de Ciudadano</h2>
      <p style={{ color: 'var(--color-texto-suave)', marginBottom: '1.25rem', fontSize: '0.9rem' }}>
        Crea tu cuenta para radicar reportes ambientales en tu comunidad.
      </p>

      {mensajeError && <div className="alerta-error">{mensajeError}</div>}

      <CampoTexto
        etiqueta="Nombre completo"
        nombre="nombre"
        valor={formulario.nombre}
        onChange={manejarCambio}
        placeholder="Ej. Angie Paola Silva"
        error={errores.nombre}
        requerido
      />

      <CampoTexto
        etiqueta="Correo electrónico"
        nombre="correo"
        tipo="email"
        valor={formulario.correo}
        onChange={manejarCambio}
        placeholder="correo@ejemplo.com"
        error={errores.correo}
        requerido
      />

      <CampoTexto
        etiqueta="Teléfono de contacto (opcional)"
        nombre="telefono"
        valor={formulario.telefono}
        onChange={manejarCambio}
        placeholder="3105551234"
        error={errores.telefono}
      />

      <CampoTexto
        etiqueta="Contraseña"
        nombre="contrasena"
        tipo="password"
        valor={formulario.contrasena}
        onChange={manejarCambio}
        placeholder="Mínimo 6 caracteres"
        error={errores.contrasena}
        requerido
      />

      <Boton tipo="submit" variante="primario">
        Crear Cuenta
      </Boton>

      <p style={{ marginTop: '1rem', textAlign: 'center', fontSize: '0.9rem' }}>
        ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
      </p>
    </form>
  );
}