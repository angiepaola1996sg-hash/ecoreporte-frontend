import { Link } from 'react-router-dom';
import { EtiquetaEstado } from '../../../components/ui/EtiquetaEstado';

/**
 * Tarjeta reutilizable que resume la información de un reporte ambiental.
 */
export function ReporteCard({ reporte, nombreCategoria }) {
  return (
    <article className="reporte-card">
      <img
        src={reporte.detalle.ruta_evidencia}
        alt={`Evidencia de ${reporte.codigo_reporte}`}
        className="reporte-card-img"
      />
      <div className="reporte-card-cuerpo">
        <div className="reporte-card-cabecera">
          <span className="codigo-radicado">{reporte.codigo_reporte}</span>
          <EtiquetaEstado idEstado={reporte.estado_reporte_id_estado} />
        </div>

        <p style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-secundario)' }}>
          Categoría: {nombreCategoria}
        </p>

        <p style={{ fontSize: '0.92rem' }}>{reporte.detalle.descripcion}</p>

        <p style={{ fontSize: '0.82rem', color: 'var(--color-texto-suave)' }}>
          📍 {reporte.detalle.direccion_manual || `${reporte.detalle.latitud}, ${reporte.detalle.longitud}`}
        </p>

        <div style={{ marginTop: 'auto', paddingTop: '0.5rem' }}>
          <Link to={`/reportes/${reporte.id_reporte}`} className="btn btn-secundario" style={{ display: 'inline-block', textDecoration: 'none', textAlign: 'center', width: '100%' }}>
            Ver Detalle y Gestión
          </Link>
        </div>
      </div>
    </article>
  );
}