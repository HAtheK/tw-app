import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  console.log('🔥 닉네임 등록 API 호출됨');

  const cookieStore = cookies();
  const kakaoId = cookieStore.get('kakao_id')?.value;
  const kakaoToken = cookieStore.get('kakao_token')?.value;

  if (!kakaoId || !kakaoToken) {
    console.warn('❌ 쿠키 누락: kakao_id 또는 kakao_token 없음');
    return NextResponse.json({ error: '인증되지 않은 요청입니다.' }, { status: 401 });
  }

  const { nickname } = await req.json();
  console.log('▶️ 닉네임 입력값:', nickname);

  if (!nickname || !/^[가-힣]{1,8}$/.test(nickname)) {
    console.warn('❌ 유효하지 않은 닉네임:', nickname);
    return NextResponse.json(
      { error: '유효한 한글 닉네임(1~8자)을 입력해주세요.' },
      { status: 400 }
    );
  }

  const supabase = createClient();

  // 닉네임 중복 검사
  const { data: existing, error: checkError } = await supabase
    .from('users')
    .select('id')
    .eq('nickname', nickname)
    .maybeSingle();

  if (checkError) {
    console.error('❌ 닉네임 중복 확인 실패:', checkError.message);
    return NextResponse.json({ error: '닉네임 확인 중 오류 발생' }, { status: 500 });
  }

  if (existing) {
    console.warn('⚠️ 중복 닉네임:', nickname);
    return NextResponse.json({ error: '이미 사용 중인 닉네임입니다.' }, { status: 409 });
  }

  // 닉네임 업데이트
  const { data: updated, error: updateError } = await supabase
    .from('users')
    .update({ nickname })
    .eq('kakao_id', kakaoId)
    .select('id');

  if (updateError || !updated || updated.length === 0) {
    console.error('❌ 닉네임 저장 실패:', updateError?.message || '업데이트 결과 없음');
    return NextResponse.json({ error: '닉네임 등록 실패' }, { status: 500 });
  }

  console.log(`✅ 닉네임 '${nickname}' 등록 성공 (userId: ${updated[0].id})`);
  return NextResponse.json({ success: true });
}
