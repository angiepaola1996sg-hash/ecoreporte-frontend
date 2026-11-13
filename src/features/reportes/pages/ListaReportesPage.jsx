import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { useReportes } from '../../../context/ReportesContext';
import { ReporteCard } from '../components/ReporteCard';

/**
 * Página principal de listado y filtrado de reportes ambientales.
 */
export function ListaReportesPage() {
  const { esAdministrador } = useAuth();
  const { reportes, categorias, estados } = useReportes();
  const [filtroEstado, setFiltroEstado] = useState('TODOS');

  const reportesFiltrados =
    filtroEstado === 'TODOS'
      ? reportes
      : reportes.filter((r) => r.estado_reporte_id_estado === Number(filtroEstado));

  function obtenerNombreCategoria(idCategoria) {
    const cat = categorias.find((c) => c.id_categoria === idCategoria);
    return cat ? cat.nombre_categoria : 'Sin categoría';
  }

  return (
    <section className="contenedor-principal">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1>Reportes Ambientales Radicados</h1>
          <p style={{ color: 'var(--color-texto-suave)' }}>
            Total encontrados: <strong>{reportesFiltrados.length}</strong>
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <select
            value={filtroEstado}
            onChange={(e) => setFiltroEstado(e.target.value)}
            className="campo-select"
            aria-label="Filtrar por estado"
          >
            <option value="TODOS">Todos los estados</option>
            {estados.map((est) => (
              <option key={est.id_estado} value={est.id_estado}>
                {est.nombre_estado}
              </option>
            ))}
          </select>

          {!esAdministrador && (
            <Link to="/reportes/nuevo" className="btn btn-primario" style={{ textDecoration: 'none' }}>
              + Nuevo Reporte
            </Link>
          )}
        </div>
      </div>

      <div className="grid-reportes">
        {reportesFiltrados.map((reporte) => (
          <ReporteCard
            key={reporte.id_reporte}
            reporte={reporte}
            nombreCategoria={obtenerNombreCategoria(reporte.categoria_id_categoria)}
          />
        ))}
      </div>
    </section>
  );
}