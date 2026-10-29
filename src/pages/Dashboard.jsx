import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();

  // Lista simulada alineada a las tablas `reporte`, `detalle_reporte` y `programacion_atencion` de MySQL
  const [reportes] = useState([
    {
      id_reporte: 1,
      codigo_reporte: 'REP-1001',
      categoria: 'Acumulación de Basura',
      direccion_manual: 'Calle 10 # 5-20, Barrio Centro',
      fecha_creacion: '2026-10-01',
      estado: 'En Revisión',
      observacion: 'Programada inspección técnica para el 05/10/2026',
      colorEstado: '#ef6c00'
    },
    {
      id_reporte: 2,
      codigo_reporte: 'REP-1002',
      categoria: 'Contaminación Hídrica',
      direccion_manual: 'Carrera 15 # 8-45',
      fecha_creacion: '2026-09-28',
      estado: 'Atendido',
      observacion: 'Muestra recolectada. Zona acordonada por la entidad ambiental',
      colorEstado: '#0288d1'
    }
  ]);

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif', backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
      {/* Encabezado */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff', padding: '1rem 2rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', marginBottom: '2rem' }}>
        <h1 style={{ color: '#2e7d32', margin: 0 }}>Ecoreporte - Panel Principal</h1>
        <button 
          onClick={() => navigate('/')} 
          style={{ padding: '0.5rem 1rem', backgroundColor: '#d32f2f', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          Cerrar Sesión
        </button>
      </header>

      <main>
        {/* Subencabezado */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h2 style={{ margin: 0, color: '#333' }}>Gestión de Incidencias Ambientales</h2>
            <p style={{ color: '#666', marginTop: '0.25rem' }}>Consulta el estado y retroalimentación de tus reportes registrados.</p>
          </div>
          <button 
            onClick={() => navigate('/nuevo-reporte')} 
            style={{ padding: '0.75rem 1.5rem', backgroundColor: '#2e7d32', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem' }}
          >
            + Crear Nuevo Reporte
          </button>
        </div>
        
        {/* Tarjetas de Métricas */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '8px', borderLeft: '5px solid #2e7d32', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
            <h3 style={{ color: '#666', margin: 0, fontSize: '0.9rem', textTransform: 'uppercase' }}>Reportes Totales</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#2e7d32', margin: '0.5rem 0 0 0' }}>{reportes.length}</p>
          </div>
          <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '8px', borderLeft: '5px solid #ef6c00', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
            <h3 style={{ color: '#666', margin: 0, fontSize: '0.9rem', textTransform: 'uppercase' }}>En Revisión</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#ef6c00', margin: '0.5rem 0 0 0' }}>1</p>
          </div>
          <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '8px', borderLeft: '5px solid #0288d1', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
            <h3 style={{ color: '#666', margin: 0, fontSize: '0.9rem', textTransform: 'uppercase' }}>Atendidos / Resueltos</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#0288d1', margin: '0.5rem 0 0 0' }}>1</p>
          </div>
        </div>

        {/* Tabla de Reportes */}
        <div style={{ background: '#fff', borderRadius: '8px', padding: '1.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          <h3 style={{ color: '#2e7d32', marginTop: 0, marginBottom: '1rem' }}>Mis Reportes Registrados</h3>
          
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ backgroundColor: '#f2f2f2', borderBottom: '2px solid #ddd' }}>
                  <th style={{ padding: '0.75rem' }}>Código</th>
                  <th style={{ padding: '0.75rem' }}>Categoría</th>
                  <th style={{ padding: '0.75rem' }}>Ubicación</th>
                  <th style={{ padding: '0.75rem' }}>Fecha</th>
                  <th style={{ padding: '0.75rem' }}>Estado</th>
                  <th style={{ padding: '0.75rem' }}>Seguimiento Autoridad</th>
                </tr>
              </thead>
              <tbody>
                {reportes.map((item) => (
                  <tr key={item.id_reporte} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '0.75rem', fontWeight: 'bold', color: '#2e7d32' }}>{item.codigo_reporte}</td>
                    <td style={{ padding: '0.75rem' }}>{item.categoria}</td>
                    <td style={{ padding: '0.75rem' }}>{item.direccion_manual}</td>
                    <td style={{ padding: '0.75rem' }}>{item.fecha_creacion}</td>
                    <td style={{ padding: '0.75rem' }}>
                      <span style={{ 
                        backgroundColor: item.colorEstado, 
                        color: '#fff', 
                        padding: '0.25rem 0.6rem', 
                        borderRadius: '12px', 
                        fontSize: '0.85rem',
                        fontWeight: 'bold'
                      }}>
                        {item.estado}
                      </span>
                    </td>
                    <td style={{ padding: '0.75rem', fontSize: '0.9rem', color: '#444', fontStyle: 'italic' }}>
                      {item.observacion}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;