/**
 * Datos de prueba (Mock Data) basados en el modelo relacional de Ecoreporte.
 * Permiten simular la operación completa de los módulos en el frontend.
 */

export const ROLES_INICIALES = [
  { id_rol: 1, nombre_rol: 'Ciudadano', descripcion: 'Usuario que reporta incidencias ambientales.' },
  { id_rol: 2, nombre_rol: 'Administrador', descripcion: 'Gestiona estados y programa atención técnica.' },
];

export const USUARIOS_INICIALES = [
  {
    id_usuario: 1,
    nombre: 'Angie Paola Silva',
    correo: 'ciudadano@ecoreporte.com',
    contrasena: '123456',
    telefono: '3105551234',
    estado_cuenta: 'Activo',
    fecha_registro: '2026-10-01 08:30:00',
    rol_id_rol: 1,
  },
  {
    id_usuario: 2,
    nombre: 'Carlos Mendoza (Admin)',
    correo: 'admin@ecoreporte.com',
    contrasena: '123456',
    telefono: '3155559876',
    estado_cuenta: 'Activo',
    fecha_registro: '2026-10-01 08:00:00',
    rol_id_rol: 2,
  },
  {
    id_usuario: 3,
    nombre: 'Usuario Suspendido',
    correo: 'inactivo@ecoreporte.com',
    contrasena: '123456',
    telefono: '3000000000',
    estado_cuenta: 'Inactivo',
    fecha_registro: '2026-10-02 10:00:00',
    rol_id_rol: 1,
  },
];

export const CATEGORIAS_INICIALES = [
  { id_categoria: 1, nombre_categoria: 'Escombros', descripcion: 'Residuos de construcción y demolición en vía pública.' },
  { id_categoria: 2, nombre_categoria: 'Orgánicos', descripcion: 'Acumulación de desechos biodegradables o podas.' },
  { id_categoria: 3, nombre_categoria: 'Voluminosos', descripcion: 'Muebles, colchones o electrodomésticos abandonados.' },
  { id_categoria: 4, nombre_categoria: 'Contaminación Hídrica', descripcion: 'Vertimientos ilegales en quebradas o ríos.' },
];

export const ESTADOS_REPORTE_INICIALES = [
  { id_estado: 1, nombre_estado: 'Pendiente' },
  { id_estado: 2, nombre_estado: 'En Proceso' },
  { id_estado: 3, nombre_estado: 'Atendido' },
];

export const REPORTES_INICIALES = [
  {
    id_reporte: 1,
    codigo_reporte: 'ECO-20261110-1042',
    fecha_creacion: '2026-11-10 09:15:00',
    usuario_id_usuario: 1,
    categoria_id_categoria: 1,
    estado_reporte_id_estado: 2,
    detalle: {
      id_detalle: 1,
      descripcion: 'Acumulación de escombros de obra bloqueando el sendero peatonal junto al parque.',
      latitud: 4.53388900,
      longitud: -75.68111100,
      direccion_manual: 'Carrera 14 con Calle 20, Armenia, Quindío',
      ruta_evidencia: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=600&q=80',
      tipo_archivo: 'JPG',
      tipo_evidencia: 'Evidencia inicial',
      fecha_carga: '2026-11-10 09:15:00',
    },
    programacion: {
      id_programacion: 1,
      fecha_programada: '2026-11-15',
      fecha_estimada_inicio: '2026-11-15',
      fecha_estimada_fin: '2026-11-16',
      disponibilidad_validada: 1,
      estado_programacion: 'Programado',
      observacion: 'Cuadrilla operativa asignada con volqueta.',
      usuario_id_usuario: 2,
    },
  },
  {
    id_reporte: 2,
    codigo_reporte: 'ECO-20261112-8491',
    fecha_creacion: '2026-11-12 14:40:00',
    usuario_id_usuario: 1,
    categoria_id_categoria: 4,
    estado_reporte_id_estado: 1,
    detalle: {
      id_detalle: 2,
      descripcion: 'Vertimiento de aguas residuales y residuos plásticos en la quebrada.',
      latitud: 4.54120000,
      longitud: -75.67250000,
      direccion_manual: 'Barrio La Clarita, sector puente peatonal',
      ruta_evidencia: 'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?auto=format&fit=crop&w=600&q=80',
      tipo_archivo: 'JPG',
      tipo_evidencia: 'Evidencia inicial',
      fecha_carga: '2026-11-12 14:40:00',
    },
    programacion: null,
  },
];