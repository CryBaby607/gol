import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
// IMPORTACIONES ACTUALIZADAS PARA LA ESTRUCTURA ANIDADA
import UserDashboardPage from './pages/user/Dashboard'; 
import AdminDashboardPage from './pages/admin/Dashboard';
import CreateQuiniela from './pages/admin/CreateQuiniela'; // Importación actualizada con el nuevo nombre

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        {/* RUTAS ACTUALIZADAS */}
        <Route path="/dashboard/user" element={<UserDashboardPage />} />
        <Route path="/dashboard/admin" element={<AdminDashboardPage />} />
        {/* Nueva Ruta Admin */}
        <Route path="/dashboard/admin/create" element={<CreateQuiniela />} />
      </Routes>
    </div>
  );
}

export default App;