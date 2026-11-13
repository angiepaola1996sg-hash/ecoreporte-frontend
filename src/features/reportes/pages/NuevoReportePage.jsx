import { NuevoReporteForm } from '../components/NuevoReporteForm';

/**
 * Vista para la creación de un nuevo reporte ambiental (RF-02).
 */
export function NuevoReportePage() {
  return (
    <section className="contenedor-principal">
      <NuevoReporteForm />
    </section>
  );
}