import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const supabase = createClient();
  const body = await req.json();
  const { nickname } = body;

  if (!nickname || !/^[가-힣]{1,8}$/.test(nickname)) {
    return NextResponse.json({ error: '유효한 한글 닉네임(최대 8자)을 입력해주세요.' }, { status: 400 });
  }

  // 쿠키에서 kakaoId 추출 (카카오 로그인 후 저장해둔 쿠키 기준)
  const kakaoId = cookies().get('kakao_id')?.value;

  if (!kakaoId) {
    return NextResponse.json({ error: '인증 정보가 없습니다.' }, { status: 401 });
  }

  // 닉네임 중복 확인
  const { data: exists, error: checkError } = await supabase
    .from('users')
    .select('id')
    .eq('nickname', nickname)
    .single();

  if (exists) {
    return NextResponse.json({ error: '이미 사용 중인 닉네임입니다.' }, { status: 409 });
  }

  // 닉네임 등록
  const { error: updateError } = await supabase
    .from('users')
    .update({ nickname })
    .eq('kakao_id', kakaoId);

  if (updateError) {
    console.error(updateError);
    return NextResponse.json({ error: '닉네임 등록 실패' }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
