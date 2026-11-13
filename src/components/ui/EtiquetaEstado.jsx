/**
 * Muestra el estado visual del reporte ambiental según su ID.
 */
export function EtiquetaEstado({ idEstado }) {
  const mapaEstados = {
    1: { texto: 'Pendiente', clase: 'badge-pendiente' },
    2: { texto: 'En Proceso', clase: 'badge-proceso' },
    3: { texto: 'Atendido', clase: 'badge-atendido' },
  };

  const info = mapaEstados[idEstado] || { texto: 'Desconocido', clase: 'badge-pendiente' };

  return <span className={`badge ${info.clase}`}>{info.texto}</span>;
}