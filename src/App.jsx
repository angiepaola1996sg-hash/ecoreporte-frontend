import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ReportesProvider } from './context/ReportesContext';
import { BarraNavegacion } from './components/layout/BarraNavegacion';
import { AppRouter } from './routes/AppRouter';

/**
 * Componente raíz de la aplicación EcoReporte.
 */
export function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ReportesProvider>
          <BarraNavegacion />
          <main>
            <AppRouter />
          </main>
        </ReportesProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;