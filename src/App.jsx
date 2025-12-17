import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Importaciones de páginas públicas
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

// Importaciones de componentes de estructura y protección
import ProtectedRoute from './components/ProtectedRoute';
import DashboardLayout from './components/DashboardLayout';

// Importaciones de páginas de usuario
import UserDashboard from './pages/user/Dashboard';
import MisQuinielas from './pages/user/MisQuinielas';
import QuinielaDetail from './pages/user/QuinielaDetail';
import MakePredictions from './pages/user/MakePredictions';
import JoinQuinielas from './pages/user/JoinQuinielas';
import ViewResults from './pages/user/ViewResults';
import History from './pages/user/History';

// Importaciones de páginas de administrador
import AdminDashboard from './pages/admin/Dashboard';
import CreateQuiniela from './pages/admin/CreateQuiniela';

// Componente simple para 404
const NotFound = () => (
    <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-4xl text-gray-700">404 | Página no encontrada</h1>
    </div>
);

function App() {
  return (
    <Routes>
      {/* 1. RUTAS PÚBLICAS */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* 2. RUTAS PROTEGIDAS Y CON LAYOUT (USUARIOS Y ADMINISTRADORES) */}
      {/* El elemento <ProtectedRoute /> verifica si hay una sesión activa.
        Si la hay, permite el acceso a las rutas hijas. 
        Si no, redirige a /login.
      */}
      <Route element={<ProtectedRoute />}>
          
          {/* DashboardLayout actúa como el contenedor (Header, Sidebar, Footer) */}
          <Route path="/dashboard" element={<DashboardLayout />}>
              
              {/* Rutas de Usuario (Anidadas bajo /dashboard) */}
              {/* La ruta 'index' es la landing page por defecto después del login */}
              <Route index element={<UserDashboard />} /> 
              <Route path="mis-quinielas" element={<MisQuinielas />} />
              <Route path="quiniela/:id" element={<QuinielaDetail />} />
              <Route path="pronosticar/:id" element={<MakePredictions />} />
              <Route path="unirse" element={<JoinQuinielas />} />
              <Route path="resultados" element={<ViewResults />} />
              <Route path="historial" element={<History />} />

              {/* Rutas de Administrador (Anidadas bajo /dashboard/admin) */}
              {/* NOTA SENIOR: Idealmente, las páginas de AdminDashboard y 
                CreateQuiniela deben contener una validación adicional 
                (ej: useAuth().user.user_metadata.role === 'admin') para 
                asegurar el acceso basado en el rol, incluso si la ruta está protegida.
              */}
              <Route path="admin" element={<AdminDashboard />} />
              <Route path="admin/crear" element={<CreateQuiniela />} />

          </Route>
      </Route>

      {/* 3. CATCH-ALL (404) */}
      <Route path="*" element={<NotFound />} />
      
    </Routes>
  );
}

export default App;