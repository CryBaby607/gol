import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Obtener la sesión inicial
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });
    
    // 2. Suscribirse a los cambios de estado de autenticación (login/logout/refresh)
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    // Limpieza: desuscribirse del listener cuando el componente se desmonte
    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  // Funciones de autenticación que usarán tus páginas Login/Register
  const signIn = async (email, password) => {
    // Usamos signInWithPassword para un flujo estándar de login con credenciales
    return await supabase.auth.signInWithPassword({ email, password });
  };

  const signUp = async (email, password) => {
    // Supabase maneja la creación de usuario y envío de email de confirmación
    return await supabase.auth.signUp({ 
        email, 
        password,
        // Opcional: añadir metadatos iniciales al usuario
        options: {
            data: {
                role: 'user' 
            }
        }
    });
  };

  const signOut = async () => {
    return await supabase.auth.signOut();
  };

  const value = {
    session,
    user,
    loading,
    signIn,
    signUp,
    signOut,
    isAuthenticated: !!session,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Hook personalizado para consumir el contexto fácilmente
export const useAuth = () => {
  return useContext(AuthContext);
};