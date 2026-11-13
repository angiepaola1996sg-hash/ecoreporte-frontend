/**
 * Componente reutilizable de entrada de formulario con etiqueta y mensaje de validación.
 */
export function CampoTexto({
  etiqueta,
  nombre,
  tipo = 'text',
  valor,
  onChange,
  placeholder = '',
  error = '',
  requerido = false,
  paso,
}) {
  return (
    <div className="campo-grupo">
      {etiqueta && (
        <label htmlFor={nombre} className="campo-etiqueta">
          {etiqueta} {requerido && <span className="texto-requerido">*</span>}
        </label>
      )}
      <input
        id={nombre}
        name={nombre}
        type={tipo}
        value={valor}
        onChange={onChange}
        placeholder={placeholder}
        step={paso}
        className={`campo-input ${error ? 'campo-input-error' : ''}`.trim()}
      />
      {error && <span className="campo-mensaje-error">{error}</span>}
    </div>
  );
}