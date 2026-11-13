import { createContext, useContext, useState } from 'react';
import { USUARIOS_INICIALES, ROLES_INICIALES } from '../data/datosPrueba';

const AuthContext = createContext(null);

/**
 * Proveedor del contexto de autenticación de Ecoreporte.
 * Gestiona la sesión del usuario activo, inicio de sesión, registro y cierre de sesión.
 */
export function AuthProvider({ children }) {
  const [usuarios, setUsuarios] = useState(USUARIOS_INICIALES);
  const [usuarioActual, setUsuarioActual] = useState(null);

  /**
   * Autentica un usuario verificando credenciales y estado de cuenta.
   * @param {string} correo - Correo electrónico del usuario.
   * @param {string} contrasena - Contraseña ingresada.
   * @returns {{ exito: boolean, mensaje: string }} Resultado de la operación.
   */
  function iniciarSesion(correo, contrasena) {
    const usuarioEncontrado = usuarios.find(
      (u) => u.correo.toLowerCase() === correo.trim().toLowerCase() && u.contrasena === contrasena
    );

    if (!usuarioEncontrado) {
      return { exito: false, mensaje: 'Correo o contraseña incorrectos.' };
    }

    // Regla 4: Un usuario con estado_cuenta = 'Inactivo' no puede autenticarse
    if (usuarioEncontrado.estado_cuenta !== 'Activo') {
      return {
        exito: false,
        mensaje: 'Su cuenta se encuentra inactiva o suspendida. Contacte al administrador.',
      };
    }

    const rolObj = ROLES_INICIALES.find((r) => r.id_rol === usuarioEncontrado.rol_id_rol);
    const sesion = {
      ...usuarioEncontrado,
      nombre_rol: rolObj ? rolObj.nombre_rol : 'Ciudadano',
    };

    setUsuarioActual(sesion);
    return { exito: true, mensaje: 'Inicio de sesión exitoso.' };
  }

  /**
   * Registra un nuevo usuario ciudadano en el estado local.
   * @param {Object} datosNuevoUsuario - Datos provenientes del formulario de registro.
   * @returns {{ exito: boolean, mensaje: string }} Resultado del registro.
   */
  function registrarUsuario(datosNuevoUsuario) {
    const existeCorreo = usuarios.some(
      (u) => u.correo.toLowerCase() === datosNuevoUsuario.correo.trim().toLowerCase()
    );

    if (existeCorreo) {
      return { exito: false, mensaje: 'El correo electrónico ya se encuentra registrado.' };
    }

    const nuevoUsuario = {
      id_usuario: usuarios.length + 1,
      nombre: datosNuevoUsuario.nombre.trim(),
      correo: datosNuevoUsuario.correo.trim(),
      contrasena: datosNuevoUsuario.contrasena,
      telefono: datosNuevoUsuario.telefono.trim() || null,
      estado_cuenta: 'Activo',
      fecha_registro: new Date().toISOString().slice(0, 19).replace('T', ' '),
      rol_id_rol: 1,
    };

    setUsuarios((prev) => [...prev, nuevoUsuario]);
    return { exito: true, mensaje: 'Registro completado. Ahora puedes iniciar sesión.' };
  }

  function cerrarSesion() {
    setUsuarioActual(null);
  }

  const esAdministrador = usuarioActual?.rol_id_rol === 2;

  return (
    <AuthContext.Provider
      value={{
        usuarioActual,
        esAdministrador,
        iniciarSesion,
        registrarUsuario,
        cerrarSesion,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}