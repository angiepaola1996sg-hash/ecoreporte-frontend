import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CreateReport() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    categoria_id_categoria: '1',
    descripcion: '',
    direccion_manual: '',
    latitud: '3.4516', // Coordenadas de ejemplo
    longitud: '-76.5320',
    ruta_evidencia: null
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulación de generación de código único de reporte (ej: REP-2026-892)
    const codigoGenerado = `REP-${Math.floor(1000 + Math.random() * 9000)}`;
    
    alert(`¡Reporte generado con éxito!\nCódigo de seguimiento: ${codigoGenerado}`);
    navigate('/dashboard');
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
      <button 
        onClick={() => navigate('/dashboard')} 
        style={{ marginBottom: '1rem', padding: '0.5rem 1rem', backgroundColor: '#666', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
      >
        ← Volver al Panel
      </button>

      <div style={{ background: '#fff', padding: '2rem', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
        <h2 style={{ color: '#2e7d32', marginTop: 0, borderBottom: '2px solid #2e7d32', paddingBottom: '0.5rem' }}>
          Registrar Nuevo Reporte Ambiental
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Categoría */}
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Categoría del Incidente:</label>
            <select 
              name="categoria_id_categoria" 
              value={formData.categoria_id_categoria} 
              onChange={handleChange}
              style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
            >
              <option value="1">Acumulación de Basura / Inadecuada disposición</option>
              <option value="2">Contaminación de Fuentes Hídricas</option>
              <option value="3">Tala / Deforestación Ilegal</option>
              <option value="4">Emisión de Gases / Contaminación del Aire</option>
              <option value="5">Emisión de Ruido Excesivo</option>
            </select>
          </div>

          {/* Dirección Manual */}
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Ubicación / Dirección:</label>
            <input 
              type="text" 
              name="direccion_manual" 
              placeholder="Ej: Calle 10 # 5-20, Barrio Centro" 
              value={formData.direccion_manual} 
              onChange={handleChange} 
              required 
              style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
            />
          </div>

          {/* Descripción */}
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Descripción del Problema:</label>
            <textarea 
              name="descripcion" 
              rows="4" 
              placeholder="Describe detalladamente lo que ocurre..." 
              value={formData.descripcion} 
              onChange={handleChange} 
              required 
              style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
            ></textarea>
          </div>

          {/* Carga de Evidencia / Foto */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Adjuntar Foto o Evidencia:</label>
            <input 
              type="file" 
              name="ruta_evidencia" 
              accept="image/*" 
              onChange={handleChange} 
              style={{ width: '100%' }}
            />
          </div>

          <button 
            type="submit" 
            style={{ width: '100%', padding: '0.75rem', backgroundColor: '#2e7d32', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem' }}
          >
            Enviar Reporte
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateReport;