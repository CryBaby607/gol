import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 

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
  const [error, setError] = useState(null); 
  const [successMessage, setSuccessMessage] = useState(null); 
  
  const navigate = useNavigate();
  const { signUp } = useAuth(); 

  const handleChange = (e) => {
    setFormData({
        ...formData,
        [e.target.name]: e.target.value
    });
  };

  const isValidEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);
    
    const { firstName, lastName, email, username, password, confirmPassword } = formData;
    
    if (!firstName || !lastName || !email || !username || !password || !confirmPassword) {
      setError('Por favor, completa todos los campos obligatorios');
      return;
    }
    
    if (!isValidEmail(email)) {
      setError('Por favor, introduce un correo electrónico válido');
      return;
    }
    
    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }
    
    setIsLoading(true);
    
    const { data, error: supabaseError } = await signUp(email, password, {
      data: { 
        first_name: firstName,
        last_name: lastName,
        username: username,
        role: 'user',
      }
    });
    
    setIsLoading(false);

    if (supabaseError) {
      setError(supabaseError.message);
    } else if (data.user) {
      setSuccessMessage('¡Cuenta creada con éxito! Revisa tu correo para confirmar.');
      setTimeout(() => navigate('/login'), 3000); 
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Crea tu cuenta
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            ¿Ya tienes cuenta?{' '}
            <Link to="/login" className="font-medium text-emerald-600 hover:text-emerald-500">
              Inicia sesión
            </Link>
          </p>
        </div>
        
        <div className="bg-white py-8 px-4 shadow-lg rounded-2xl sm:px-10 border border-gray-100">
          <form className="space-y-4" onSubmit={handleSubmit}>
            
            {error && (
                <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm flex items-center">
                    <i className="fas fa-exclamation-triangle mr-2"></i>
                    {error}
                </div>
            )}
            {successMessage && (
                <div className="p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg text-sm flex items-center">
                    <i className="fas fa-check-circle mr-2"></i>
                    {successMessage}
                </div>
            )}

            {/* Inputs: Nombre y Apellido (En una fila) */}
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Nombre</label>
                    <input
                        name="firstName"
                        type="text"
                        required
                        value={formData.firstName}
                        onChange={handleChange}
                        className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Apellido</label>
                    <input
                        name="lastName"
                        type="text"
                        required
                        value={formData.lastName}
                        onChange={handleChange}
                        className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                    />
                </div>
            </div>

            {/* Input: Username */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Usuario</label>
              <input
                name="username"
                type="text"
                required
                value={formData.username}
                onChange={handleChange}
                className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
              />
            </div>

            {/* Input: Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
              <input
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
              />
            </div>

            {/* Input: Contraseña */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Contraseña</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm pr-10"
                  />
                   <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 cursor-pointer focus:outline-none"
                    >
                    <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                </button>
              </div>
            </div>

            {/* Input: Confirmar Contraseña */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Confirmar Contraseña</label>
              <input
                name="confirmPassword"
                type="password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
              />
            </div>

            <div>
              <button 
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-lg text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors duration-300 shadow-md transform active:scale-95 disabled:opacity-50"
              >
                 {isLoading ? (
                    <span className="flex items-center">
                        <i className="fas fa-spinner fa-spin animate-spin mr-2"></i> Creando...
                    </span>
                  ) : (
                    'Registrarme'
                  )}
              </button>
            </div>

          </form>
        </div>
      </div>
    </main>
  );
};

export default Register;