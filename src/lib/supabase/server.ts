// src/lib/supabase/server.ts

import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

// createClient 함수 정의
export const createClient = () => {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookies().get(name)?.value;
        },
        set(name: string, value: string, options: any) {
          cookies().set({ name, value, ...options });
        },
        remove(name: string, options: any) {
          cookies().delete({ name, ...options });
        },
      },
    }
  );
};
