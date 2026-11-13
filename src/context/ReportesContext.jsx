import { createContext, useContext, useState } from 'react';
import {
  REPORTES_INICIALES,
  CATEGORIAS_INICIALES,
  ESTADOS_REPORTE_INICIALES,
} from '../data/datosPrueba';

const ReportesContext = createContext(null);

/**
 * Proveedor de estado compartido para la gestión de reportes ambientales.
 */
export function ReportesProvider({ children }) {
  const [reportes, setReportes] = useState(REPORTES_INICIALES);

  /**
   * Genera un código único con formato ECO-AAAAMMDD-XXXX según la Regla 2 del Plan Técnico.
   * @returns {string} Código de radicación único.
   */
  function generarCodigoUnico() {
    const fecha = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const aleatorio = Math.floor(1000 + Math.random() * 9000);
    const codigo = `ECO-${fecha}-${aleatorio}`;
    const existe = reportes.some((r) => r.codigo_reporte === codigo);
    return existe ? generarCodigoUnico() : codigo;
  }

  /**
   * Crea un nuevo reporte ambiental con su detalle georreferenciado.
   * @param {Object} datosFormulario - Datos validados del formulario.
   * @param {number} idUsuario - ID del ciudadano autenticado.
   * @returns {Object} El nuevo reporte creado.
   */
  function crearReporte(datosFormulario, idUsuario) {
    const ahora = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const nuevoId = reportes.length + 1;

    const nuevoReporte = {
      id_reporte: nuevoId,
      codigo_reporte: generarCodigoUnico(),
      fecha_creacion: ahora,
      usuario_id_usuario: idUsuario,
      categoria_id_categoria: Number(datosFormulario.categoria_id_categoria),
      estado_reporte_id_estado: 1,
      detalle: {
        id_detalle: nuevoId,
        descripcion: datosFormulario.descripcion.trim(),
        latitud: Number(parseFloat(datosFormulario.latitud).toFixed(8)),
        longitud: Number(parseFloat(datosFormulario.longitud).toFixed(8)),
        direccion_manual: datosFormulario.direccion_manual.trim() || null,
        ruta_evidencia:
          datosFormulario.ruta_evidencia.trim() ||
          'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=600&q=80',
        tipo_archivo: 'JPG',
        tipo_evidencia: 'Evidencia inicial',
        fecha_carga: ahora,
      },
      programacion: null,
    };

    setReportes((prev) => [nuevoReporte, ...prev]);
    return nuevoReporte;
  }

  /**
   * Actualiza el estado de un reporte existente (RF-05).
   * @param {number} idReporte - ID del reporte.
   * @param {number} nuevoIdEstado - Nuevo ID de estado (1, 2 o 3).
   */
  function actualizarEstadoReporte(idReporte, nuevoIdEstado) {
    setReportes((prev) =>
      prev.map((rep) =>
        rep.id_reporte === idReporte
          ? { ...rep, estado_reporte_id_estado: Number(nuevoIdEstado) }
          : rep
      )
    );
  }

  /**
   * Registra o actualiza la programación de atención técnica (RF-04).
   * @param {number} idReporte - ID del reporte a programar.
   * @param {Object} datosProgramacion - Fechas y observaciones de la cuadrilla.
   * @param {number} idAdmin - ID del administrador que programa.
   */
  function guardarProgramacionAtencion(idReporte, datosProgramacion, idAdmin) {
    setReportes((prev) =>
      prev.map((rep) => {
        if (rep.id_reporte !== idReporte) return rep;
        return {
          ...rep,
          estado_reporte_id_estado: 2,
          programacion: {
            id_programacion: rep.programacion?.id_programacion || Date.now(),
            fecha_programada: datosProgramacion.fecha_programada,
            fecha_estimada_inicio: datosProgramacion.fecha_estimada_inicio || datosProgramacion.fecha_programada,
            fecha_estimada_fin: datosProgramacion.fecha_estimada_fin || datosProgramacion.fecha_programada,
            disponibilidad_validada: 1,
            estado_programacion: 'Programado',
            observacion: datosProgramacion.observacion.trim(),
            usuario_id_usuario: idAdmin,
          },
        };
      })
    );
  }

  function obtenerReportePorId(idReporte) {
    return reportes.find((r) => r.id_reporte === Number(idReporte));
  }

  return (
    <ReportesContext.Provider
      value={{
        reportes,
        categorias: CATEGORIAS_INICIALES,
        estados: ESTADOS_REPORTE_INICIALES,
        crearReporte,
        actualizarEstadoReporte,
        guardarProgramacionAtencion,
        obtenerReportePorId,
      }}
    >
      {children}
    </ReportesContext.Provider>
  );
}

export function useReportes() {
  return useContext(ReportesContext);
}