// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
// crybaby607/gol/gol-892b65e742b51e47da58d14b620ae39f40ba0ae3/src/App.jsx

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
// IMPORTACIONES DE DASHBOARD DE USUARIO
import UserDashboardPage from './pages/user/Dashboard'; 
import MisQuinielasPage from './pages/user/MisQuinielas';
import JoinQuinielas from './pages/user/JoinQuinielas';
import ViewResults from './pages/user/ViewResults';
import History from './pages/user/History';
import QuinielaDetail from './pages/user/QuinielaDetail'; // NUEVA IMPORTACIÓN

// IMPORTACIONES DE DASHBOARD DE ADMINISTRADOR
import AdminDashboardPage from './pages/admin/Dashboard';
import CreateQuiniela from './pages/admin/CreateQuiniela'; 

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        {/* RUTAS DEL DASHBOARD DE USUARIO */}
        <Route path="/dashboard/user" element={<UserDashboardPage />} />
        <Route path="/dashboard/user/quinielas" element={<MisQuinielasPage />} />
        <Route path="/dashboard/user/join" element={<JoinQuinielas />} />
        <Route path="/dashboard/user/results" element={<ViewResults />} />
        <Route path="/dashboard/user/history" element={<History />} />
        
        {/* NUEVA RUTA DINÁMICA DE DETALLE/PRONÓSTICO */}
        <Route path="/dashboard/user/quiniela/:id" element={<QuinielaDetail />} />

        {/* RUTAS DEL DASHBOARD DE ADMINISTRADOR */}
        <Route path="/dashboard/admin" element={<AdminDashboardPage />} />
        <Route path="/dashboard/admin/create" element={<CreateQuiniela />} />
        {/* Las rutas /manage y /users de admin necesitan páginas placeholder */}
      </Routes>
    </div>
  );
}

export default App;