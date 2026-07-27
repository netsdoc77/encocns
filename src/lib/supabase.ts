import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder';

if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
  console.warn('⚠️ Supabase 환경변수가 설정되지 않았습니다. .env 파일에 VITE_SUPABASE_URL 및 VITE_SUPABASE_ANON_KEY를 추가해 주세요.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
