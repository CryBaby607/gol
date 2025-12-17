import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Importar el hook de autenticación

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null); // Nuevo estado para errores
  const [successMessage, setSuccessMessage] = useState(null); // Nuevo estado para mensaje de éxito
  
  const navigate = useNavigate();
  const { signUp } = useAuth(); // Usar la función de registro de Supabase

  // ... (passwordStrength, passwordChecks, passwordMatch, isValidEmail se mantienen) ...

  const handleSubmit = async (e) => { // La función ahora es async
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);
    
    const { firstName, lastName, email, username, password, confirmPassword } = formData;
    
    // Validaciones (se mantienen para control de frontend)
    if (!firstName || !lastName || !email || !username || !password || !confirmPassword) {
      setError('Por favor, completa todos los campos obligatorios');
      return;
    }
    
    if (!isValidEmail(email)) {
      setError('Por favor, introduce un correo electrónico válido');
      return;
    }
    
    if (password.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }
    
    setIsLoading(true);
    
    // LÓGICA DE REGISTRO SUPABASE
    const { 
      data, 
      error: supabaseError 
    } = await signUp(email, password, {
      data: { // Guardar datos adicionales como metadata
        first_name: firstName,
        last_name: lastName,
        username: username,
        role: 'user', // Establecer un rol por defecto
      }
    });
    
    setIsLoading(false);

    if (supabaseError) {
      // Manejar errores de Supabase (ej: usuario ya existe)
      setError(supabaseError.message);
    } else if (data.user) {
      // Registro exitoso. Supabase enviará un email de confirmación.
      setSuccessMessage('¡Registro exitoso! Por favor, revisa tu correo electrónico para confirmar tu cuenta y poder iniciar sesión.');
      // Opcional: Redirigir al login después de un breve periodo
      setTimeout(() => navigate('/login'), 5000); 
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* ... (Header) ... */}
        
        <div className="bg-white py-8 px-4 shadow-lg rounded-2xl sm:px-10 border border-gray-100">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Mostrar el mensaje de error o éxito */}
            {error && (
                <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
                    {error}
                </div>
            )}
            {successMessage && (
                <div className="p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg text-sm">
                    {successMessage}
                </div>
            )}

            {/* ... (Todos los inputs) ... */}
            
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
                    <i className="fas fa-user-plus"></i>
                  )}
                </span>
                {isLoading ? 'Creando cuenta...' : 'Crear cuenta'}
              </button>
            </div>

          </form>
        </div>

      </div>
    </main>
  );
};

export default Register;