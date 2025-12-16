import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = ({ isAdmin }) => {
  const location = useLocation();

  const links = isAdmin
    ? [
        { path: '/dashboard/admin', name: 'Resumen Admin', icon: 'fas fa-chart-line' },
        { path: '/dashboard/admin/create', name: 'Crear Quiniela', icon: 'fas fa-plus-circle' },
        { path: '/dashboard/admin/manage', name: 'Gestionar Quinielas', icon: 'fas fa-clipboard-list' },
        { path: '/dashboard/admin/users', name: 'Gestionar Usuarios', icon: 'fas fa-users' },
      ]
    : [
        { path: '/dashboard/user', name: 'Resumen', icon: 'fas fa-chart-line' },
        { path: '/dashboard/user/quinielas', name: 'Mis Quinielas', icon: 'fas fa-trophy' },
        { path: '/dashboard/user/profile', name: 'Mi Perfil', icon: 'fas fa-user-circle' },
        { path: '/dashboard/user/history', name: 'Historial', icon: 'fas fa-history' },
      ];

  // Determinar la clase de resaltado para el fondo del sidebar
  const bgColor = isAdmin ? 'bg-red-700 hover:bg-red-800' : 'bg-emerald-600 hover:bg-emerald-700';

  return (
    <div className="w-64 bg-gray-900 text-white min-h-screen p-4 flex flex-col">
      <div className="p-2 rounded-lg font-bold text-2xl mb-8">
        <span className="text-white">TURI</span>
        <span className="text-emerald-500">GOL</span>
        <span className="text-xs block text-gray-400 mt-1">
          {isAdmin ? 'ADMIN' : 'USUARIO'}
        </span>
      </div>
      <nav className="flex-grow">
        <ul className="space-y-2">
          {links.map((link) => (
            <li key={link.path}>
              <Link 
                to={link.path} 
                // Clase dinámica para el enlace activo/hover
                className={`flex items-center space-x-3 p-3 rounded-lg text-gray-300 hover:text-white transition-colors 
                ${location.pathname === link.path ? bgColor : 'hover:bg-gray-700'}`}
              >
                <i className={`${link.icon} w-5`}></i>
                <span className="font-medium">{link.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="mt-auto pt-4 border-t border-gray-700">
        <Link 
          to="/" 
          className="flex items-center space-x-3 p-3 rounded-lg text-gray-300 hover:bg-red-600 hover:text-white transition-colors"
        >
          <i className="fas fa-sign-out-alt w-5"></i>
          <span className="font-medium">Cerrar Sesión</span>
        </Link>
      </div>
    </div>
  );
};

const DashboardLayout = ({ children, isAdmin }) => {
  return (
    <div className="flex min-h-screen">
      <Sidebar isAdmin={isAdmin} />
      <div className="flex-grow flex flex-col">
        <header className="bg-white shadow-sm p-4 border-b border-gray-200">
            <h1 className="text-xl font-semibold text-gray-800">
                {isAdmin ? "Panel de Administrador" : "Panel de Usuario"}
            </h1>
        </header>
        
        {/* Contenido principal */}
        <main className="flex-grow p-6 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;