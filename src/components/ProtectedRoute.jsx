// src/components/ProtectedRoute.jsx

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    // Puedes reemplazar esto con un spinner global o un componente de carga
    return (
      <main className="min-h-screen flex items-center justify-center">
        <i className="fas fa-spinner fa-spin text-4xl text-emerald-600"></i>
      </main>
    );
  }

  if (!isAuthenticated) {
    // Redirigir al login si no está autenticado
    return <Navigate to="/login" replace />;
  }
  
  // Si está autenticado, renderiza las rutas hijas
  return <Outlet />;
};

export default ProtectedRoute;