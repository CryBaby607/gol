import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminRoute = () => {
  const { user, loading } = useAuth();
  
  if (loading) return <div>Cargando...</div>;

  // Si no es admin, lo mandamos de vuelta al dashboard de usuario
  if (user?.user_metadata?.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default AdminRoute;