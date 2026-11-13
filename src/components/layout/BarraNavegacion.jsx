import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Boton } from '../ui/Boton';

/**
 * Barra de navegación principal con enlaces dinámicos según el rol autenticado.
 */
export function BarraNavegacion() {
  const { usuarioActual, esAdministrador, cerrarSesion } = useAuth();
  const navegar = useNavigate();

  function manejarCierreSesion() {
    cerrarSesion();
    navegar('/login');
  }

  return (
    <header className="navbar">
      <div className="navbar-contenedor">
        <Link to="/reportes" className="navbar-marca">
          🌿 EcoReporte
        </Link>

        {usuarioActual ? (
          <nav className="navbar-menu">
            <Link to="/reportes" className="navbar-enlace">
              Reportes
            </Link>
            {!esAdministrador && (
              <Link to="/reportes/nuevo" className="navbar-enlace">
                + Radicar Reporte
              </Link>
            )}
            {esAdministrador && (
              <Link to="/programacion" className="navbar-enlace">
                Agenda Técnica
              </Link>
            )}
            <div className="navbar-usuario">
              <span className="usuario-badge">
                {usuarioActual.nombre} ({usuarioActual.nombre_rol})
              </span>
              <Boton variante="secundario" onClick={manejarCierreSesion}>
                Salir
              </Boton>
            </div>
          </nav>
        ) : (
          <nav className="navbar-menu">
            <Link to="/login" className="navbar-enlace">
              Iniciar Sesión
            </Link>
            <Link to="/registro" className="navbar-enlace">
              Registrarse
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}