import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function getSession() {
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: cookies(), // ✅ 이렇게 함수 실행한 값을 넘겨야 함
    }
  );

  const { data } = await supabase.auth.getUser();
  return data?.user ?? null;
}
