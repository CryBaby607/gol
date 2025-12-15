// crybaby607/gol/gol-648c4a2ffd8f9d2a8ab815316cbe6caf1bf54792/src/components/Login.jsx

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const isValidEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      alert('Por favor, completa todos los campos');
      return;
    }
    
    if (!isValidEmail(email)) {
      alert('Por favor, introduce un correo electrónico válido');
      return;
    }
    
    // Si la contraseña es menor a 6 caracteres, muestra una alerta
    if (password.length < 6) {
      alert('La contraseña debe tener al menos 6 caracteres');
      return;
    }
    
    setIsLoading(true);

    // LÓGICA DE SIMULACIÓN DE ROLES Y REDIRECCIÓN
    const isAdmin = email === 'admin@turigol.com';
    const redirectPath = isAdmin ? '/dashboard/admin' : '/dashboard/user';
    
    // Simulación de inicio de sesión
    setTimeout(() => {
      setIsLoading(false);
      alert(`¡Inicio de sesión exitoso! Redirigiendo al ${isAdmin ? 'Panel de Administrador' : 'Panel de Usuario'}...`);
      navigate(redirectPath); // Redirección basada en el rol simulado
    }, 1500);
  };

  // Se eliminó la función handleSocialLogin ya que no se utiliza.

  const handleForgotPassword = () => {
    alert('Redirigiendo al formulario de recuperación de contraseña');
  };

  return (
    <div className="max-w-md w-full space-y-8">
      <div className="text-center">
        <Link to="/" className="inline-block">
          <div className="p-2 rounded-lg font-bold text-4xl">
            <span className="text-black">TURI</span>
            <span className="text-emerald-500">GOL</span>
          </div>
        </Link>
        <h2 className="mt-6 text-3xl font-bold text-gray-900">
          Inicia sesión en tu cuenta
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          O 
          <Link to="/register" className="font-medium text-emerald-600 hover:text-emerald-500 ml-1">
            crea una cuenta nueva
          </Link>
        </p>
      </div>
      
      <div className="bg-white py-8 px-4 shadow-lg rounded-2xl sm:px-10 border border-gray-100">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Correo electrónico
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i className="fas fa-envelope text-gray-400"></i>
              </div>
              <input 
                id="email" 
                name="email" 
                type="email" 
                autoComplete="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg input-focus focus:outline-none focus:z-10 sm:text-sm"
                placeholder="ejemplo@correo.com (o admin@turigol.com)"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Contraseña
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i className="fas fa-lock text-gray-400"></i>
              </div>
              <input 
                id="password" 
                name="password" 
                type={showPassword ? "text" : "password"} 
                autoComplete="current-password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg input-focus focus:outline-none focus:z-10 sm:text-sm"
                placeholder="••••••••"
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <i className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"} text-gray-400 hover:text-gray-600`}></i>
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input 
                id="remember-me" 
                name="remember-me" 
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                Recordarme
              </label>
            </div>

            <div className="text-sm">
              <button 
                type="button"
                onClick={handleForgotPassword}
                className="font-medium text-emerald-600 hover:text-emerald-500"
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>
          </div>

          <div>
            <button 
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-lg text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                {isLoading ? (
                  <i className="fas fa-spinner fa-spin"></i>
                ) : (
                  <i className="fas fa-sign-in-alt"></i>
                )}
              </span>
              {isLoading ? 'Procesando...' : 'Iniciar sesión'}
            </button>
          </div>

        </form>
      </div>

    </div>
  );
};

export default Login;