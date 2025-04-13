import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function getSession() {
  const supabase = createServerClient({
    cookies
  })

  const { data: { session } } = await supabase.auth.getSession()
  return session
}
