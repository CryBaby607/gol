import { createClient } from '@supabase/supabase-js';

// Las variables de entorno son accesibles a través de import.meta.env en proyectos Vite
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Creamos y exportamos la instancia del cliente Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
