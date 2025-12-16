// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
// IMPORTACIONES DE DASHBOARD DE USUARIO (Nombres simplificados)
import UserDashboardPage from './pages/user/Dashboard'; 
import MisQuinielasPage from './pages/user/MisQuinielas';
import JoinQuinielas from './pages/user/JoinQuinielas'; // Importación simplificada
import MakePredictions from './pages/user/MakePredictions'; // Importación simplificada
import ViewResults from './pages/user/ViewResults'; // Importación simplificada
import History from './pages/user/History'; // Importación simplificada

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
        <Route path="/dashboard/user/join" element={<JoinQuinielas />} /> {/* Ruta usando componente simplificado */}
        <Route path="/dashboard/user/predict" element={<MakePredictions />} /> {/* Ruta usando componente simplificado */}
        <Route path="/dashboard/user/results" element={<ViewResults />} /> {/* Ruta usando componente simplificado */}
        <Route path="/dashboard/user/history" element={<History />} /> {/* Ruta usando componente simplificado */}

        {/* RUTAS DEL DASHBOARD DE ADMINISTRADOR */}
        <Route path="/dashboard/admin" element={<AdminDashboardPage />} />
        <Route path="/dashboard/admin/create" element={<CreateQuiniela />} />
        {/* Las rutas /manage y /users de admin necesitan páginas placeholder */}
      </Routes>
    </div>
  );
}

export default App;