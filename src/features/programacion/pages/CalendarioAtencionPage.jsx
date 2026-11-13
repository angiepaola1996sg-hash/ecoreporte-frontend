import { Link } from 'react-router-dom';
import { useReportes } from '../../../context/ReportesContext';
import { EtiquetaEstado } from '../../../components/ui/EtiquetaEstado';

/**
 * Vista consolidada de atención técnica programada (RF-04).
 */
export function CalendarioAtencionPage() {
  const { reportes } = useReportes();
  const reportesProgramados = reportes.filter((r) => r.programacion !== null);

  return (
    <section className="contenedor-principal">
      <h1>Agenda de Atención Técnica</h1>
      <p style={{ color: 'var(--color-texto-suave)', marginBottom: '1.25rem' }}>
        Incidencias ambientales con visita operativa programada ({reportesProgramados.length}).
      </p>

      {reportesProgramados.length === 0 ? (
        <div className="tarjeta-formulario">No hay atenciones técnicas programadas aún.</div>
      ) : (
        <div style={{ display: 'grid', gap: '1rem' }}>
          {reportesProgramados.map((rep) => (
            <div
              key={rep.id_reporte}
              style={{ background: '#fff', padding: '1.25rem', borderRadius: '8px', border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}
            >
              <div>
                <span className="codigo-radicado">{rep.codigo_reporte}</span> —{' '}
                <EtiquetaEstado idEstado={rep.estado_reporte_id_estado} />
                <p style={{ marginTop: '0.4rem', fontWeight: 600 }}>
                  📅 Fecha programada: {rep.programacion.fecha_programada} (Fin estimado: {rep.programacion.fecha_estimada_fin})
                </p>
                <p style={{ fontSize: '0.9rem', color: 'var(--color-texto-suave)' }}>
                  {rep.programacion.observacion || 'Sin observaciones registradas'}
                </p>
              </div>
              <Link to={`/reportes/${rep.id_reporte}`} className="btn btn-secundario" style={{ textDecoration: 'none' }}>
                Gestionar Reporte
              </Link>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}