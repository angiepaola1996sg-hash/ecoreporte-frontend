/**
 * Componente atómico reutilizable para botones del sistema.
 * @param {Object} props
 * @param {'primario'|'secundario'|'peligro'} [props.variante='primario']
 */
export function Boton({
  children,
  tipo = 'button',
  variante = 'primario',
  onClick,
  deshabilitado = false,
  className = '',
}) {
  return (
    <button
      type={tipo}
      onClick={onClick}
      disabled={deshabilitado}
      className={`btn btn-${variante} ${className}`.trim()}
    >
      {children}
    </button>
  );
}