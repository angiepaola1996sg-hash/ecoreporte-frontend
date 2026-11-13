import { LoginForm } from '../components/LoginForm';

/**
 * Vista principal de autenticación (RF-01).
 */
export function LoginPage() {
  return (
    <section className="contenedor-principal">
      <LoginForm />
    </section>
  );
}