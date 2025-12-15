// src/components/Dashboard.jsx
import React from 'react';

const Dashboard = () => {
  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-gray-800 mb-6">Panel de Usuario</h2>
        <p className="text-lg text-gray-600 mb-8">
          Bienvenido a tu dashboard personalizado. Aquí puedes ver tus quinielas activas, historial y estadísticas.
        </p>
        
        {/* Tarjetas de Resumen */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-emerald-500">
            <h3 className="text-xl font-semibold mb-2 text-emerald-800">Mis Quinielas</h3>
            <p className="text-2xl font-bold">5</p>
            <p className="text-sm text-gray-500">Activadas</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-amber-500">
            <h3 className="text-xl font-semibold mb-2 text-amber-800">Saldo</h3>
            <p className="text-2xl font-bold">€15.00</p>
            <p className="text-sm text-gray-500">Disponible</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
            <h3 className="text-xl font-semibold mb-2 text-blue-800">Victorias</h3>
            <p className="text-2xl font-bold">3</p>
            <p className="text-sm text-gray-500">En total</p>
          </div>
        </div>
        
        {/* Sección de Próximos Eventos */}
        <div className="mt-10 bg-white p-8 rounded-lg shadow-xl">
          <h3 className="text-2xl font-bold mb-4 text-gray-800">Próximos Partidos</h3>
          <p className="text-gray-600">Aquí se mostrará la lista de partidos para pronosticar y gestionar.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;