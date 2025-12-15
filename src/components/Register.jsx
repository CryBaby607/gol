import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    terms: false,
    newsletter: false
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    text: 'Débil',
    color: 'bg-red-500',
    width: '25%'
  });

  const [passwordChecks, setPasswordChecks] = useState({
    length: false,
    number: false,
    letter: false
  });

  const [passwordMatch, setPasswordMatch] = useState({
    isMatch: false,
    message: '',
    color: ''
  });

  const isValidEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const checkPasswordStrength = (password) => {
    let score = 0;
    const checks = {
      length: false,
      number: false,
      letter: false
    };

    // Longitud mínima
    if (password.length >= 8) {
      score += 1;
      checks.length = true;
    }

    // Contiene números
    if (/\d/.test(password)) {
      score += 1;
      checks.number = true;
    }

    // Contiene letras
    if (/[a-zA-Z]/.test(password)) {
      score += 1;
      checks.letter = true;
    }

    // Contiene caracteres especiales
    if (/[^a-zA-Z0-9]/.test(password)) {
      score += 1;
    }

    // Actualizar estado de checks
    setPasswordChecks(checks);

    // Determinar fuerza
    let strength = {
      score,
      text: 'Débil',
      color: 'bg-red-500',
      width: '25%'
    };

    if (score === 2) {
      strength = { ...strength, text: 'Regular', color: 'bg-yellow-500', width: '50%' };
    } else if (score === 3) {
      strength = { ...strength, text: 'Buena', color: 'bg-blue-500', width: '75%' };
    } else if (score >= 4) {
      strength = { ...strength, text: 'Fuerte', color: 'bg-green-500', width: '100%' };
    }

    setPasswordStrength(strength);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    if (name === 'password') {
      checkPasswordStrength(value);
      checkPasswordMatch(value, formData.confirmPassword);
    }

    if (name === 'confirmPassword') {
      checkPasswordMatch(formData.password, value);
    }
  };

  const checkPasswordMatch = (password, confirmPassword) => {
    if (!password || !confirmPassword) {
      setPasswordMatch({ isMatch: false, message: '', color: '' });
      return;
    }

    if (password === confirmPassword) {
      setPasswordMatch({ 
        isMatch: true, 
        message: '✓ Las contraseñas coinciden', 
        color: 'text-green-600' 
      });
    } else {
      setPasswordMatch({ 
        isMatch: false, 
        message: '✗ Las contraseñas no coinciden', 
        color: 'text-red-600' 
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const { firstName, lastName, email, username, password, confirmPassword, terms } = formData;
    
    // Validaciones
    if (!firstName || !lastName || !email || !username || !password || !confirmPassword) {
      alert('Por favor, completa todos los campos obligatorios');
      return;
    }
    
    if (!isValidEmail(email)) {
      alert('Por favor, introduce un correo electrónico válido');
      return;
    }
    
    if (password.length < 8) {
      alert('La contraseña debe tener al menos 8 caracteres');
      return;
    }
    
    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }
    
    if (!terms) {
      alert('Debes aceptar los términos y condiciones');
      return;
    }
    
    setIsLoading(true);
    
    // Simulación de registro
    setTimeout(() => {
      setIsLoading(false);
      alert('¡Registro exitoso! Tu cuenta ha sido creada. Redirigiendo...');
      navigate('/');
    }, 1500);
  };

  const handleSocialRegister = (provider) => {
    alert(`Registrarse con ${provider} (funcionalidad de demostración)`);
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
          Crea tu cuenta
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          O 
          <Link to="/login" className="font-medium text-emerald-600 hover:text-emerald-500 ml-1">
            inicia sesión si ya tienes cuenta
          </Link>
        </p>
      </div>
      
      <div className="bg-white py-8 px-4 shadow-lg rounded-2xl sm:px-10 border border-gray-100">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                Nombre
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fas fa-user text-gray-400"></i>
                </div>
                <input 
                  id="firstName" 
                  name="firstName" 
                  type="text" 
                  autoComplete="given-name" 
                  required
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="pl-10 appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg input-focus focus:outline-none focus:z-10 sm:text-sm"
                  placeholder="Juan"
                />
              </div>
            </div>

            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                Apellido
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fas fa-user text-gray-400"></i>
                </div>
                <input 
                  id="lastName" 
                  name="lastName" 
                  type="text" 
                  autoComplete="family-name" 
                  required
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="pl-10 appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg input-focus focus:outline-none focus:z-10 sm:text-sm"
                  placeholder="Pérez"
                />
              </div>
            </div>
          </div>

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
                value={formData.email}
                onChange={handleInputChange}
                className="pl-10 appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg input-focus focus:outline-none focus:z-10 sm:text-sm"
                placeholder="ejemplo@correo.com"
              />
            </div>
          </div>

          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
              Nombre de usuario
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i className="fas fa-at text-gray-400"></i>
              </div>
              <input 
                id="username" 
                name="username" 
                type="text" 
                autoComplete="username" 
                required
                value={formData.username}
                onChange={handleInputChange}
                className="pl-10 appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg input-focus focus:outline-none focus:z-10 sm:text-sm"
                placeholder="juanperez"
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
                autoComplete="new-password" 
                required
                value={formData.password}
                onChange={handleInputChange}
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
            
            {/* Indicador de fortaleza de contraseña */}
            <div className="mt-2">
              <div className="flex justify-between mb-1">
                <span className="text-xs text-gray-500">Fortaleza de la contraseña</span>
                <span className={`text-xs font-medium ${passwordStrength.color.replace('bg-', 'text-')}`}>
                  {passwordStrength.text}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div 
                  className={`${passwordStrength.color} h-1.5 rounded-full transition-all duration-300`}
                  style={{ width: passwordStrength.width }}
                ></div>
              </div>
              <div className="mt-2 text-xs text-gray-500">
                <p>La contraseña debe contener al menos:</p>
                <ul className="list-disc list-inside ml-2">
                  <li className={passwordChecks.length ? "text-green-500" : "text-red-500"}>
                    8 caracteres
                  </li>
                  <li className={passwordChecks.number ? "text-green-500" : "text-red-500"}>
                    1 número
                  </li>
                  <li className={passwordChecks.letter ? "text-green-500" : "text-red-500"}>
                    1 letra
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Confirmar contraseña
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i className="fas fa-lock text-gray-400"></i>
              </div>
              <input 
                id="confirmPassword" 
                name="confirmPassword" 
                type={showPassword ? "text" : "password"} 
                autoComplete="new-password" 
                required
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="pl-10 appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg input-focus focus:outline-none focus:z-10 sm:text-sm"
                placeholder="••••••••"
              />
            </div>
            {passwordMatch.message && (
              <div className={`mt-1 text-xs ${passwordMatch.color}`}>
                {passwordMatch.message}
              </div>
            )}
          </div>

          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input 
                id="terms" 
                name="terms" 
                type="checkbox" 
                required
                checked={formData.terms}
                onChange={handleInputChange}
                className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="terms" className="text-gray-700">
                Acepto los 
                <a href="#" className="font-medium text-emerald-600 hover:text-emerald-500 ml-1">
                  Términos de servicio
                </a> 
                y la 
                <a href="#" className="font-medium text-emerald-600 hover:text-emerald-500 ml-1">
                  Política de privacidad
                </a>
              </label>
            </div>
          </div>

          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input 
                id="newsletter" 
                name="newsletter" 
                type="checkbox"
                checked={formData.newsletter}
                onChange={handleInputChange}
                className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="newsletter" className="text-gray-700">
                Quiero recibir novedades sobre quinielas y promociones especiales
              </label>
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
                  <i className="fas fa-user-plus"></i>
                )}
              </span>
              {isLoading ? 'Creando cuenta...' : 'Crear cuenta'}
            </button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                O regístrate con
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button 
              type="button"
              onClick={() => handleSocialRegister('Google')}
              className="w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <i className="fab fa-google text-red-500 mr-2"></i>
              Google
            </button>
            <button 
              type="button"
              onClick={() => handleSocialRegister('Facebook')}
              className="w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <i className="fab fa-facebook text-blue-600 mr-2"></i>
              Facebook
            </button>
          </div>
        </form>
      </div>

      <div className="text-center text-sm text-gray-600">
        <p>
          ¿Eres un administrador de ligas? 
          <a href="#" className="font-medium text-emerald-600 hover:text-emerald-500 ml-1">
            Contáctanos para crear quinielas personalizadas
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;