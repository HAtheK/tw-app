import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(req: Request) {
  const { code } = await req.json();

  if (!code) {
    return NextResponse.json({ error: 'Missing code' }, { status: 400 });
  }

  const { error } = await supabase
    .from('share_counts')
    .insert([{ code }]);

  if (error) {
    console.error(error);
    return NextResponse.json({ error: 'Insert failed' }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
