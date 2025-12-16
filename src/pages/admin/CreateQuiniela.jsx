import React, { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';

const CreateQuiniela = () => {
  const [formData, setFormData] = useState({
    titulo: '',
    liga: '',
    jornada: '',
    fechaCierre: '',
    descripcion: '',
  });
  
  // Función para inicializar el estado con exactamente 9 partidos
  const createInitialPartidos = () => {
    // Una quiniela está conformada por 9 juegos
    return Array.from({ length: 9 }, () => ({ local: '', visitante: '', fecha: '' }));
  };

  // Inicialización con 9 juegos
  const [partidos, setPartidos] = useState(createInitialPartidos());

  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Manejador de cambios para los campos de partido
  const handlePartidoChange = (index, e) => {
    const { name, value } = e.target;
    const newPartidos = partidos.map((partido, i) => {
      if (i === index) {
        return { ...partido, [name]: value };
      }
      return partido;
    });
    setPartidos(newPartidos);
  };
  
  // Se eliminaron handleAddPartido y handleRemovePartido ya que los 9 juegos son fijos.

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validación de que todos los campos de los 9 partidos estén completos
    if (partidos.some(p => !p.local || !p.visitante || !p.fecha)) {
        alert('Por favor, completa todos los detalles de los 9 partidos (Local, Visitante y Fecha).');
        return;
    }
    
    // Validación de datos generales (aunque los campos ya tienen 'required')
    const { titulo, liga, jornada, fechaCierre, descripcion } = formData;
    if (!titulo || !liga || !jornada || !fechaCierre || !descripcion) {
        alert('Por favor, completa todos los campos de datos generales.');
        return;
    }

    setIsLoading(true);
    
    // Simulación de lógica de creación de quiniela
    console.log('Creando quiniela con datos generales:', formData);
    console.log('Partidos incluidos:', partidos);
    
    setTimeout(() => {
      setIsLoading(false);
      alert(`¡Quiniela "${formData.titulo}" con 9 partidos creada con éxito!`);
      // Resetear formulario
      setFormData({
        titulo: '',
        liga: '',
        jornada: '',
        fechaCierre: '',
        descripcion: '',
      });
      setPartidos(createInitialPartidos()); 
    }, 1500);
  };

  return (
    <DashboardLayout isAdmin={true}>
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-red-700 mb-6">Crear Nueva Quiniela</h2>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Sección de Datos Generales */}
          <div className="space-y-6 border-b pb-6 border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800">1. Datos Generales de la Quiniela</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Título de la Quiniela */}
              <div>
                <label htmlFor="titulo" className="block text-sm font-medium text-gray-700 mb-1">
                  Título
                </label>
                <input 
                  id="titulo" 
                  name="titulo" 
                  type="text" 
                  required
                  value={formData.titulo}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                  placeholder="Ej: LaLiga - Jornada 29"
                />
              </div>
              
              {/* Liga */}
              <div>
                <label htmlFor="liga" className="block text-sm font-medium text-gray-700 mb-1">
                  Liga
                </label>
                <select
                  id="liga"
                  name="liga"
                  required
                  value={formData.liga}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                >
                  <option value="">Selecciona una liga</option>
                  <option value="LIGA SANTANDER">LIGA SANTANDER</option>
                  <option value="CHAMPIONS LEAGUE">CHAMPIONS LEAGUE</option>
                  <option value="PREMIER LEAGUE">PREMIER LEAGUE</option>
                </select>
              </div>
              
              {/* Jornada/Fase */}
              <div>
                <label htmlFor="jornada" className="block text-sm font-medium text-gray-700 mb-1">
                  Jornada / Fase
                </label>
                <input 
                  id="jornada" 
                  name="jornada" 
                  type="text" 
                  required
                  value={formData.jornada}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                  placeholder="Ej: Jornada 29"
                />
              </div>

              {/* Fecha de Cierre */}
              <div>
                <label htmlFor="fechaCierre" className="block text-sm font-medium text-gray-700 mb-1">
                  Fecha de Cierre de Pronósticos
                </label>
                <input 
                  id="fechaCierre" 
                  name="fechaCierre" 
                  type="datetime-local" 
                  required
                  value={formData.fechaCierre}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                />
              </div>
            </div>

            {/* Descripción */}
            <div>
              <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700 mb-1">
                Descripción
              </label>
              <textarea
                id="descripcion"
                name="descripcion"
                rows="3"
                required
                value={formData.descripcion}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                placeholder="Escribe una descripción corta de la quiniela..."
              ></textarea>
            </div>
          </div>

          {/* Sección de Partidos - Fija a 9 Juegos */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-800">
                2. Partidos de la Quiniela (9 Juegos Requeridos)
            </h3>
            
            <div className="space-y-4">
                {partidos.map((partido, index) => (
                    <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                        
                        {/* Indicador de Partido */}
                        <div className="text-lg font-bold text-red-700 w-10 flex-shrink-0">
                            P{index + 1}:
                        </div>

                        {/* Equipo Local */}
                        <div className="flex-grow">
                            <label htmlFor={`local-${index}`} className="block text-xs font-medium text-gray-500 mb-1">Local (1)</label>
                            <input
                                id={`local-${index}`}
                                name="local"
                                type="text"
                                required
                                value={partido.local}
                                onChange={(e) => handlePartidoChange(index, e)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                placeholder="Ej: Real Madrid"
                            />
                        </div>

                        {/* Equipo Visitante */}
                        <div className="flex-grow">
                            <label htmlFor={`visitante-${index}`} className="block text-xs font-medium text-gray-500 mb-1">Visitante (2)</label>
                            <input
                                id={`visitante-${index}`}
                                name="visitante"
                                type="text"
                                required
                                value={partido.visitante}
                                onChange={(e) => handlePartidoChange(index, e)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                placeholder="Ej: Barcelona"
                            />
                        </div>

                        {/* Fecha/Hora del Partido */}
                        <div className="w-56 flex-shrink-0">
                            <label htmlFor={`fecha-${index}`} className="block text-xs font-medium text-gray-500 mb-1">Fecha/Hora</label>
                            <input
                                id={`fecha-${index}`}
                                name="fecha"
                                type="datetime-local"
                                required
                                value={partido.fecha}
                                onChange={(e) => handlePartidoChange(index, e)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                            />
                        </div>
                        
                        {/* Se eliminó el botón de Eliminar */}
                    </div>
                ))}
            </div>
          </div>
          
          {/* Botón de envío final (Guardar Quiniela) */}
          <div>
            <button 
              type="submit"
              // El botón se deshabilita si está cargando
              disabled={isLoading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-lg text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                {isLoading ? (
                  <i className="fas fa-spinner fa-spin"></i>
                ) : (
                  <i className="fas fa-save"></i>
                )}
              </span>
              {isLoading ? 'Guardando Quiniela...' : `Crear y Guardar Quiniela con 9 partidos`}
            </button>
          </div>
        </form>

      </div>
    </DashboardLayout>
  );
};

export default CreateQuiniela;