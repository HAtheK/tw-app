import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST() {
  await supabase.from('share_counts').insert({});
  return NextResponse.json({ status: 'ok' });
}
