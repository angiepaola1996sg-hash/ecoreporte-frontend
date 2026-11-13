import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { useReportes } from '../../../context/ReportesContext';
import { EtiquetaEstado } from '../../../components/ui/EtiquetaEstado';
import { Boton } from '../../../components/ui/Boton';
import { ProgramarAtencionModal } from '../../programacion/components/ProgramarAtencionModal';

/**
 * Vista de detalle georreferenciado del reporte y gestión administrativa (RF-03, RF-04, RF-05).
 */
export function DetalleReportePage() {
  const { id } = useParams();
  const { esAdministrador } = useAuth();
  const { obtenerReportePorId, categorias, estados, actualizarEstadoReporte } = useReportes();

  const [mostrarProgramacion, setMostrarProgramacion] = useState(false);
  const [mensajeAlerta, setMensajeAlerta] = useState('');

  const reporte = obtenerReportePorId(id);

  if (!reporte) {
    return (
      <section className="contenedor-principal">
        <div className="alerta-error">No se encontró el reporte solicitado.</div>
        <Link to="/reportes" className="btn btn-secundario" style={{ textDecoration: 'none' }}>
          Volver al listado
        </Link>
      </section>
    );
  }

  const categoria = categorias.find((c) => c.id_categoria === reporte.categoria_id_categoria);

  function manejarCambioEstado(evento) {
    const nuevoEstado = Number(evento.target.value);
    actualizarEstadoReporte(reporte.id_reporte, nuevoEstado);
    setMensajeAlerta('Estado del reporte actualizado correctamente.');
  }

  return (
    <section className="contenedor-principal">
      <div style={{ marginBottom: '1rem' }}>
        <Link to="/reportes" style={{ color: 'var(--color-primario)', fontWeight: 600 }}>
          ← Volver a todos los reportes
        </Link>
      </div>

      {mensajeAlerta && <div className="alerta-exito">{mensajeAlerta}</div>}

      <div className="tarjeta-formulario" style={{ maxWidth: '800px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
          <h2>Radicado: <span className="codigo-radicado">{reporte.codigo_reporte}</span></h2>
          <EtiquetaEstado idEstado={reporte.estado_reporte_id_estado} />
        </div>

        <img
          src={reporte.detalle.ruta_evidencia}
          alt="Evidencia ambiental"
          style={{ width: '100%', maxHeight: '340px', objectFit: 'cover', borderRadius: '8px', marginBottom: '1.25rem' }}
        />

        <div style={{ display: 'grid', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <p><strong>Categoría:</strong> {categoria ? categoria.nombre_categoria : 'General'}</p>
          <p><strong>Fecha de radicación:</strong> {reporte.fecha_creacion}</p>
          <p><strong>Descripción:</strong> {reporte.detalle.descripcion}</p>
          <p><strong>Dirección / Referencia:</strong> {reporte.detalle.direccion_manual || 'No especificada'}</p>
          <p>
            <strong>Coordenadas geográficas:</strong> Latitud <code>{reporte.detalle.latitud}</code>, Longitud <code>{reporte.detalle.longitud}</code>
          </p>
        </div>

        {/* Sección de programación técnica existente */}
        <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '1.5rem' }}>
          <h3 style={{ marginBottom: '0.5rem', fontSize: '1.05rem' }}>Programación de Atención Técnica</h3>
          {reporte.programacion ? (
            <div style={{ fontSize: '0.92rem', display: 'grid', gap: '0.35rem' }}>
              <p><strong>Fecha programada:</strong> {reporte.programacion.fecha_programada}</p>
              <p><strong>Ventana estimada:</strong> {reporte.programacion.fecha_estimada_inicio} al {reporte.programacion.fecha_estimada_fin}</p>
              <p><strong>Estado operativo:</strong> {reporte.programacion.estado_programacion}</p>
              <p><strong>Observación:</strong> {reporte.programacion.observacion || 'Sin observaciones'}</p>
            </div>
          ) : (
            <p style={{ color: 'var(--color-texto-suave)', fontSize: '0.9rem' }}>
              Aún no se ha programado visita técnica para este reporte.
            </p>
          )}
        </div>

        {/* Controles exclusivos del Administrador (RF-04 y RF-05) */}
        {esAdministrador && (
          <div style={{ borderTop: '1px solid var(--color-borde)', paddingTop: '1.25rem', display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <label htmlFor="select-estado" style={{ fontWeight: 600 }}>Cambiar estado:</label>
              <select
                id="select-estado"
                value={reporte.estado_reporte_id_estado}
                onChange={manejarCambioEstado}
                className="campo-select"
              >
                {estados.map((est) => (
                  <option key={est.id_estado} value={est.id_estado}>
                    {est.nombre_estado}
                  </option>
                ))}
              </select>
            </div>

            <Boton variante="primario" onClick={() => setMostrarProgramacion(!mostrarProgramacion)}>
              {mostrarProgramacion ? 'Cerrar Agenda' : '📅 Programar Atención Técnica'}
            </Boton>
          </div>
        )}

        {esAdministrador && mostrarProgramacion && (
          <ProgramarAtencionModal
            reporte={reporte}
            onCerrar={() => {
              setMostrarProgramacion(false);
              setMensajeAlerta('Programación técnica guardada y estado actualizado a En Proceso.');
            }}
          />
        )}
      </div>
    </section>
  );
}