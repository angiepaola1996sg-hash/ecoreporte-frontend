import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { useReportes } from '../../../context/ReportesContext';
import { CampoTexto } from '../../../components/ui/CampoTexto';
import { Boton } from '../../../components/ui/Boton';

/**
 * Formulario de radicación de reportes ambientales (RF-02 y RF-03).
 * Incluye captura automática de ubicación GPS del navegador y validación geográfica estricta.
 */
export function NuevoReporteForm() {
  const { usuarioActual } = useAuth();
  const { categorias, crearReporte } = useReportes();
  const navegar = useNavigate();

  const [formulario, setFormulario] = useState({
    categoria_id_categoria: '',
    descripcion: '',
    latitud: '',
    longitud: '',
    direccion_manual: '',
    ruta_evidencia: '',
  });
  const [errores, setErrores] = useState({});
  const [estadoGps, setEstadoGps] = useState('');
  const [cargandoUbicacion, setCargandoUbicacion] = useState(false);

  function manejarCambio(evento) {
    const { name, value } = evento.target;
    setFormulario((prev) => ({ ...prev, [name]: value }));
  }

  /**
   * Captura las coordenadas GPS actuales desde el navegador del ciudadano.
   */
  function obtenerUbicacionActual() {
    setEstadoGps('');

    if (!navigator.geolocation) {
      setEstadoGps('Tu navegador no soporta geolocalización automática. Ingrésala manualmente.');
      return;
    }

    setCargandoUbicacion(true);
    navigator.geolocation.getCurrentPosition(
      (posicion) => {
        setFormulario((prev) => ({
          ...prev,
          latitud: posicion.coords.latitude.toFixed(6),
          longitud: posicion.coords.longitude.toFixed(6),
        }));
        setErrores((prev) => ({ ...prev, latitud: '', longitud: '' }));
        setEstadoGps('Ubicación GPS capturada correctamente.');
        setCargandoUbicacion(false);
      },
      () => {
        // Si el navegador bloquea el permiso en entorno local, asigna coordenadas de prueba en Armenia, Quindío
        setFormulario((prev) => ({
          ...prev,
          latitud: '4.533889',
          longitud: '-75.681111',
        }));
        setEstadoGps('No se pudo acceder al GPS físico; se cargó una coordenada de referencia.');
        setCargandoUbicacion(false);
      }
    );
  }

  /**
   * Valida todos los campos incluyendo los rangos geográficos permitidos (-90/90 y -180/180).
   */
  function validarFormulario() {
    const nuevosErrores = {};

    if (!formulario.categoria_id_categoria) {
      nuevosErrores.categoria_id_categoria = 'Seleccione una categoría ambiental.';
    }

    if (!formulario.descripcion.trim() || formulario.descripcion.trim().length < 15) {
      nuevosErrores.descripcion = 'Describa el problema con al menos 15 caracteres.';
    }

    const lat = parseFloat(formulario.latitud);
    if (formulario.latitud === '' || isNaN(lat) || lat < -90 || lat > 90) {
      nuevosErrores.latitud = 'La latitud debe ser un número válido entre -90 y 90.';
    }

    const lng = parseFloat(formulario.longitud);
    if (formulario.longitud === '' || isNaN(lng) || lng < -180 || lng > 180) {
      nuevosErrores.longitud = 'La longitud debe ser un número válido entre -180 y 180.';
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  }

  function manejarEnvio(evento) {
    evento.preventDefault();
    if (!validarFormulario()) return;

    const nuevoReporte = crearReporte(formulario, usuarioActual.id_usuario);
    navegar(`/reportes/${nuevoReporte.id_reporte}`);
  }

  return (
    <form onSubmit={manejarEnvio} className="tarjeta-formulario" noValidate>
      <h2 style={{ marginBottom: '0.5rem' }}>Radicar Nuevo Reporte Ambiental</h2>
      <p style={{ color: 'var(--color-texto-suave)', marginBottom: '1.25rem', fontSize: '0.9rem' }}>
        Se generará automáticamente un código de radicado único (ECO-AAAAMMDD-XXXX).
      </p>

      <div className="campo-grupo">
        <label htmlFor="categoria_id_categoria" className="campo-etiqueta">
          Categoría de incidencia <span className="texto-requerido">*</span>
        </label>
        <select
          id="categoria_id_categoria"
          name="categoria_id_categoria"
          value={formulario.categoria_id_categoria}
          onChange={manejarCambio}
          className={`campo-select ${errores.categoria_id_categoria ? 'campo-input-error' : ''}`}
        >
          <option value="">-- Seleccione una categoría --</option>
          {categorias.map((cat) => (
            <option key={cat.id_categoria} value={cat.id_categoria}>
              {cat.nombre_categoria}
            </option>
          ))}
        </select>
        {errores.categoria_id_categoria && (
          <span className="campo-mensaje-error">{errores.categoria_id_categoria}</span>
        )}
      </div>

      <div className="campo-grupo">
        <label htmlFor="descripcion" className="campo-etiqueta">
          Descripción detallada del problema <span className="texto-requerido">*</span>
        </label>
        <textarea
          id="descripcion"
          name="descripcion"
          rows="3"
          value={formulario.descripcion}
          onChange={manejarCambio}
          placeholder="Describa la afectación ambiental observada..."
          className={`campo-textarea ${errores.descripcion ? 'campo-input-error' : ''}`}
        />
        {errores.descripcion && <span className="campo-mensaje-error">{errores.descripcion}</span>}
      </div>

      <div style={{ background: '#f8fafc', padding: '0.9rem', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <span style={{ fontWeight: 600, fontSize: '0.92rem' }}>Ubicación geográfica</span>
          <Boton
            tipo="button"
            variante="secundario"
            onClick={obtenerUbicacionActual}
            deshabilitado={cargandoUbicacion}
          >
            {cargandoUbicacion ? 'Obteniendo GPS...' : '📍 Usar mi ubicación actual'}
          </Boton>
        </div>

        {estadoGps && (
          <p style={{ fontSize: '0.82rem', color: 'var(--color-primario)', marginBottom: '0.6rem' }}>
            {estadoGps}
          </p>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
          <CampoTexto
            etiqueta="Latitud (-90 a 90)"
            nombre="latitud"
            tipo="number"
            paso="any"
            valor={formulario.latitud}
            onChange={manejarCambio}
            placeholder="Ej. 4.533889"
            error={errores.latitud}
            requerido
          />

          <CampoTexto
            etiqueta="Longitud (-180 a 180)"
            nombre="longitud"
            tipo="number"
            paso="any"
            valor={formulario.longitud}
            onChange={manejarCambio}
            placeholder="Ej. -75.681111"
            error={errores.longitud}
            requerido
          />
        </div>
      </div>

      <CampoTexto
        etiqueta="Dirección o punto de referencia"
        nombre="direccion_manual"
        valor={formulario.direccion_manual}
        onChange={manejarCambio}
        placeholder="Ej. Carrera 14 con Calle 20"
      />

      <CampoTexto
        etiqueta="URL de evidencia fotográfica (opcional)"
        nombre="ruta_evidencia"
        valor={formulario.ruta_evidencia}
        onChange={manejarCambio}
        placeholder="https://... (si se deja vacío se asigna foto de prueba)"
      />

      <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
        <Boton tipo="submit" variante="primario">
          Radicar Reporte
        </Boton>
        <Boton tipo="button" variante="secundario" onClick={() => navegar('/reportes')}>
          Cancelar
        </Boton>
      </div>
    </form>
  );
}