// src/lib/session.ts (서버 전용)
import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';

export async function getSession() {
  const supabase = createServerClient({
    cookies
  });
  const { data } = await supabase.auth.getUser();
  return data;
}
