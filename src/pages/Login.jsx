import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Importar el hook de autenticación

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null); // Nuevo estado para manejar errores
  
  const navigate = useNavigate();
  const { signIn } = useAuth(); // Usar la función de login de Supabase

  // ... (isValidEmail se mantiene) ...

  const isValidEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e) => { // La función ahora es async
    e.preventDefault();
    setError(null); // Limpiar errores anteriores
    
    if (!email || !password) {
      setError('Por favor, completa todos los campos');
      return;
    }
    
    if (!isValidEmail(email)) {
      setError('Por favor, introduce un correo electrónico válido');
      return;
    }
    
    // Supabase tiene un requisito de 6 caracteres por defecto,
    // pero mantendremos tu validación de frontend:
    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }
    
    setIsLoading(true);

    // LÓGICA DE AUTENTICACIÓN SUPABASE
    const { 
        data, 
        error: supabaseError 
    } = await signIn(email, password);
    
    setIsLoading(false);

    if (supabaseError) {
      // Supabase devuelve errores claros (ej: "Invalid login credentials")
      setError(supabaseError.message);
    } else if (data.user) {
      // Inicio de sesión exitoso. El AuthContext ya actualizó la sesión.
      
      // NOTA SENIOR: La lógica de roles debe ser manejada
      // leyendo los custom claims del JWT o los metadatos del usuario
      // para decidir la redirección. Por ahora, asumiremos que los roles
      // se leen de la metadata o se obtienen de la tabla 'profiles'.
      const userRole = data.user.user_metadata.role || 'user'; // Asumiendo que el rol se guarda en metadata
      const redirectPath = userRole === 'admin' ? '/dashboard/admin' : '/dashboard/user';
      
      // Redirigir y reemplazar el historial (buena práctica de auth)
      navigate(redirectPath, { replace: true });
    }
  };

  // ... (handleForgotPassword se mantiene) ...

  return (
    <main className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* ... (Header) ... */}
        
        <div className="bg-white py-8 px-4 shadow-lg rounded-2xl sm:px-10 border border-gray-100">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Mostrar el error de Supabase/validación aquí */}
            {error && (
                <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
                    {error}
                </div>
            )}
            
            {/* ... (inputs, checkboxes, buttons) ... */}
            
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
    </main>
  );
};

export default Login;