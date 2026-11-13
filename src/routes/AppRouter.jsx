import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LoginPage } from '../features/auth/pages/LoginPage';
import { RegistroPage } from '../features/auth/pages/RegistroPage';
import { ListaReportesPage } from '../features/reportes/pages/ListaReportesPage';
import { NuevoReportePage } from '../features/reportes/pages/NuevoReportePage';
import { DetalleReportePage } from '../features/detalles/pages/DetalleReportePage';
import { CalendarioAtencionPage } from '../features/programacion/pages/CalendarioAtencionPage';

function RutaProtegida({ children }) {
  const { usuarioActual } = useAuth();
  return usuarioActual ? children : <Navigate to="/login" replace />;
}

/**
 * Enrutador central de EcoReporte según la sección 2.3 del Plan Técnico.
 */
export function AppRouter() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/registro" element={<RegistroPage />} />

      <Route
        path="/reportes"
        element={
          <RutaProtegida>
            <ListaReportesPage />
          </RutaProtegida>
        }
      />
      <Route
        path="/reportes/nuevo"
        element={
          <RutaProtegida>
            <NuevoReportePage />
          </RutaProtegida>
        }
      />
      <Route
        path="/reportes/:id"
        element={
          <RutaProtegida>
            <DetalleReportePage />
          </RutaProtegida>
        }
      />
      <Route
        path="/programacion"
        element={
          <RutaProtegida>
            <CalendarioAtencionPage />
          </RutaProtegida>
        }
      />

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}