import React from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom'; // Agregamos Outlet
import { useAuth } from '../context/AuthContext'; // Importamos el contexto

// Componente helper para el badge
const Badge = ({ count, color = 'bg-red-500' }) => (
  <span className={`ml-auto inline-flex items-center justify-center px-2 py-0.5 text-xs font-bold leading-none text-white ${color} rounded-full`}>
    {count}
  </span>
);

const Sidebar = ({ isAdmin }) => {
  const location = useLocation();

  const userLinks = [
    {
      section: 'Principal',
      items: [
        { path: '/dashboard', name: 'Inicio', icon: 'fas fa-home' }, // Ajustado path raíz
        { path: '/dashboard/mis-quinielas', name: 'Mis Quinielas', icon: 'fas fa-trophy', badgeCount: 3 },
        { path: '/dashboard/unirse', name: 'Unirme a Quinielas', icon: 'fas fa-plus-square' },
      ]
    },
    {
      section: 'Resultados',
      items: [
        { path: '/dashboard/resultados', name: 'Ver Resultados', icon: 'fas fa-poll' },
        { path: '/dashboard/historial', name: 'Historial', icon: 'fas fa-history' },
      ]
    },
  ];

  const adminLinks = [
    { path: '/dashboard/admin', name: 'Resumen Admin', icon: 'fas fa-chart-line' },
    { path: '/dashboard/admin/crear', name: 'Crear Quiniela', icon: 'fas fa-plus-circle' },
    { path: '/dashboard/admin/manage', name: 'Gestionar Quinielas', icon: 'fas fa-clipboard-list' },
    { path: '/dashboard/admin/users', name: 'Gestionar Usuarios', icon: 'fas fa-users' },
  ];

  const links = isAdmin ? adminLinks : userLinks;
  const bgColor = isAdmin ? 'bg-red-700 hover:bg-red-800' : 'bg-emerald-600 hover:bg-emerald-700';
  const logoColor = isAdmin ? 'text-red-500' : 'text-emerald-500'; // Color del logo dinámico

  return (
    <div className="w-64 bg-gray-900 text-white min-h-screen p-4 flex flex-col fixed left-0 top-0 h-full overflow-y-auto">
      <div className="p-2 rounded-lg font-bold text-2xl mb-8 flex flex-col">
        <div>
            <span className="text-white">TURI</span>
            <span className={logoColor}>GOL</span>
        </div>
        <span className="text-xs text-gray-400 mt-1 uppercase tracking-wider">
          {isAdmin ? 'Administrador' : 'Usuario'}
        </span>
      </div>
      
      <nav className="flex-grow">
        <ul className="space-y-4">
          {/* Renderizado condicional de enlaces */}
          {(!isAdmin ? links : [{ items: links }]).map((group, i) => (
             <React.Fragment key={i}>
                {group.section && (
                    <h4 className="text-xs font-semibold uppercase text-gray-500 mb-2 mt-4 px-3">
                        {group.section}
                    </h4>
                )}
                <ul className="space-y-2">
                    {(group.items || []).map((link) => {
                       const isActive = location.pathname === link.path || 
                                      (link.path !== '/dashboard' && location.pathname.startsWith(link.path));
                       
                       return (
                          <li key={link.path}>
                            <Link 
                              to={link.path} 
                              className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 
                              ${isActive ? bgColor + ' shadow-lg transform scale-105' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}
                            >
                              <i className={`${link.icon} w-5 text-center`}></i>
                              <span className="font-medium">{link.name}</span>
                              {link.badgeCount && <Badge count={link.badgeCount} />}
                            </Link>
                          </li>
                       );
                    })}
                </ul>
             </React.Fragment>
          ))}
        </ul>
      </nav>
      
      <div className="mt-auto pt-4 border-t border-gray-700">
        <Link 
          to="/" 
          className="flex items-center space-x-3 p-3 rounded-lg text-gray-400 hover:bg-red-900/50 hover:text-red-400 transition-colors"
        >
          <i className="fas fa-sign-out-alt w-5 text-center"></i>
          <span className="font-medium">Cerrar Sesión</span>
        </Link>
      </div>
    </div>
  );
};

const DashboardLayout = () => { // Ya no necesitamos recibir props
  const { user } = useAuth(); // Obtenemos el usuario del contexto
  
  // Detectamos el rol directamente de la metadata
  const isAdmin = user?.user_metadata?.role === 'admin';

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar fijo */}
      <Sidebar isAdmin={isAdmin} />
      
      {/* Contenido principal con margen para respetar el sidebar */}
      <div className="flex-grow flex flex-col ml-64 transition-all duration-300">
        <header className="bg-white shadow-sm h-16 flex items-center px-8 justify-between sticky top-0 z-10">
            <h1 className="text-xl font-bold text-gray-800">
                {isAdmin ? "Panel de Control" : "Mi Panel"}
            </h1>
            
            {/* Información del usuario en el header */}
            <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600 font-medium">
                    {user?.user_metadata?.username || user?.email}
                </span>
                <div className={`h-8 w-8 rounded-full flex items-center justify-center text-white font-bold ${isAdmin ? 'bg-red-600' : 'bg-emerald-600'}`}>
                    {user?.email?.charAt(0).toUpperCase()}
                </div>
            </div>
        </header>
        
        {/* Aquí se renderizan las páginas hijas (Outlet) */}
        <main className="flex-grow p-8">
          <Outlet /> 
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;