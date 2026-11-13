import { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useReportes } from '../../../context/ReportesContext';
import { CampoTexto } from '../../../components/ui/CampoTexto';
import { Boton } from '../../../components/ui/Boton';

/**
 * Formulario para programar la atención técnica de un reporte (RF-04).
 * Valida la coherencia cronológica definida en la Regla 3 del Plan Técnico.
 */
export function ProgramarAtencionModal({ reporte, onCerrar }) {
  const { usuarioActual } = useAuth();
  const { guardarProgramacionAtencion } = useReportes();

  const [formulario, setFormulario] = useState({
    fecha_programada: reporte.programacion?.fecha_programada || '',
    fecha_estimada_inicio: reporte.programacion?.fecha_estimada_inicio || '',
    fecha_estimada_fin: reporte.programacion?.fecha_estimada_fin || '',
    observacion: reporte.programacion?.observacion || '',
  });
  const [errores, setErrores] = useState({});

  function manejarCambio(evento) {
    const { name, value } = evento.target;
    setFormulario((prev) => ({ ...prev, [name]: value }));
  }

  /**
   * Regla 3: fecha_programada >= fecha_creacion y fecha_estimada_fin >= fecha_estimada_inicio.
   */
  function validarCronograma() {
    const nuevosErrores = {};
    const fechaCreacionSoloDia = reporte.fecha_creacion.slice(0, 10);

    if (!formulario.fecha_programada) {
      nuevosErrores.fecha_programada = 'La fecha programada es obligatoria.';
    } else if (formulario.fecha_programada < fechaCreacionSoloDia) {
      nuevosErrores.fecha_programada = `No puede ser anterior a la radicación (${fechaCreacionSoloDia}).`;
    }

    if (
      formulario.fecha_estimada_inicio &&
      formulario.fecha_estimada_fin &&
      formulario.fecha_estimada_fin < formulario.fecha_estimada_inicio
    ) {
      nuevosErrores.fecha_estimada_fin = 'La fecha final no puede ser anterior a la fecha de inicio.';
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  }

  function manejarEnvio(evento) {
    evento.preventDefault();
    if (!validarCronograma()) return;

    guardarProgramacionAtencion(reporte.id_reporte, formulario, usuarioActual.id_usuario);
    onCerrar();
  }

  return (
    <form
      onSubmit={manejarEnvio}
      style={{ marginTop: '1.25rem', padding: '1.25rem', background: '#f1f8e9', borderRadius: '8px', border: '1px solid #c5e1a5' }}
    >
      <h4 style={{ marginBottom: '0.75rem' }}>Asignar Cronograma Operativo</h4>

      <CampoTexto
        etiqueta="Fecha programada de atención"
        nombre="fecha_programada"
        tipo="date"
        valor={formulario.fecha_programada}
        onChange={manejarCambio}
        error={errores.fecha_programada}
        requerido
      />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
        <CampoTexto
          etiqueta="Fecha estimada inicio"
          nombre="fecha_estimada_inicio"
          tipo="date"
          valor={formulario.fecha_estimada_inicio}
          onChange={manejarCambio}
        />

        <CampoTexto
          etiqueta="Fecha estimada fin"
          nombre="fecha_estimada_fin"
          tipo="date"
          valor={formulario.fecha_estimada_fin}
          onChange={manejarCambio}
          error={errores.fecha_estimada_fin}
        />
      </div>

      <CampoTexto
        etiqueta="Observación logística / cuadrilla"
        nombre="observacion"
        valor={formulario.observacion}
        onChange={manejarCambio}
        placeholder="Ej. Asignar vehículo recolector en jornada de la mañana"
      />

      <div style={{ display: 'flex', gap: '0.75rem' }}>
        <Boton tipo="submit" variante="primario">
          Guardar Programación
        </Boton>
        <Boton tipo="button" variante="secundario" onClick={onCerrar}>
          Cancelar
        </Boton>
      </div>
    </form>
  );
}