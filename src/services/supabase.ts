/**
 * Supabase Client
 * 
 * ⚠️ IMPORTANTE: NUNCA expor chaves, tokens ou segredos
 * As variáveis de ambiente devem ser configuradas via .env.local
 * e este arquivo não deve ser commitado no Git
 */

// TODO: Configurar Supabase quando necessário
// Por enquanto, o sistema usa apenas React state (sem persistência)

// Exemplo de estrutura futura:
// import { createClient } from '@supabase/supabase-js';
// 
// const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
// const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
// 
// if (!supabaseUrl || !supabaseAnonKey) {
//   throw new Error('Missing Supabase environment variables');
// }
// 
// export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const supabase = null; // Placeholder até integração futura
