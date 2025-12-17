import React from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../../components/DashboardLayout';

const UserDashboardPage = () => {
  // Datos simulados
  const activeQuinielasCount = 3;
  const totalWinnings = "€15.00"; 
  const currentRank = "Top 10%"; 

  return (
    <DashboardLayout isAdmin={false}>
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-emerald-800 mb-4">Resumen de Usuario</h2>
        <p className="text-gray-600">Bienvenido de nuevo. Revisa el estado de tus quinielas y únete a nuevas competencias.</p>
        
        {/* Tarjetas de Métricas Principales */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Quinielas Activas Card (Clickable) */}
            <Link to="/dashboard/user/quinielas" className="block transform transition duration-300 hover:scale-[1.02] hover:shadow-lg">
                <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200 cursor-pointer">
                    <p className="text-sm text-emerald-600">Quinielas Activas</p>
                    <p className="text-3xl font-bold text-emerald-900">{activeQuinielasCount}</p>
                    <p className="text-sm text-gray-500 mt-2">Haz clic para gestionar</p>
                </div>
            </Link>

            {/* Saldo/Ganancias Card */}
            <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                <p className="text-sm text-amber-600">Saldo / Ganancias</p>
                <p className="text-3xl font-bold text-amber-900">{totalWinnings}</p>
                <p className="text-sm text-gray-500 mt-2">Disponible para retiro</p>
            </div>

            {/* Récord Card */}
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-600">Récord</p>
                <p className="text-3xl font-bold text-blue-900">{currentRank}</p>
                <p className="text-sm text-gray-500 mt-2">Posición global</p>
            </div>
        </div>

        {/* Call to Action para Unirse a Quinielas */}
        <div className="mt-8 p-6 bg-emerald-100 border-2 border-emerald-300 rounded-xl flex flex-col sm:flex-row items-center justify-between shadow-inner space-y-4 sm:space-y-0">
            <div>
                <h3 className="text-xl font-bold text-emerald-800">¿Buscas una nueva competencia?</h3>
                <p className="text-emerald-700">Explora las quinielas disponibles y demuestra tu habilidad pronosticando.</p>
            </div>
            <Link
                to="/dashboard/user/join"
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center space-x-2 shadow-md w-full sm:w-auto justify-center"
            >
                <i className="fas fa-plus-square"></i>
                <span>Unirme a Quinielas</span>
            </Link>
        </div>

        {/* Sección de Resumen de Premios/Noticias (Placeholder) */}
        <div className="mt-8 bg-gray-50 p-6 rounded-xl shadow-md border border-gray-200">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Próximos Partidos para Pronosticar</h3>
          <p className="text-gray-600">Dirígete a **Mis Quinielas** para encontrar los partidos pendientes dentro de cada quiniela activa.</p>
        </div>

      </div>
    </DashboardLayout>
  );
};

export default UserDashboardPage;