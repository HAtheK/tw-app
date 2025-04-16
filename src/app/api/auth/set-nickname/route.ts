import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';


export async function POST(req: Request) {
  console.log('🔥🔥🔥 닉네임 API 라우트가 실행되었습니다');

  const supabase = createClient();
  const body = await req.json();
  const { nickname } = body;

  console.log('▶️ 닉네임 제출 요청:', nickname);

  if (!nickname || !/^[가-힣]{1,8}$/.test(nickname)) {
    console.warn('❌ 유효하지 않은 닉네임:', nickname);
    return NextResponse.json({ error: '유효한 한글 닉네임(최대 8자)을 입력해주세요.' }, { status: 400 });
  }

  // 1. 쿠키에서 kakao_id 추출
  const kakaoId = cookies().get('kakao_id')?.value;
  console.log('🔍 쿠키에서 추출한 kakao_id:', kakaoId);

  if (!kakaoId) {
    console.error('❌ kakao_id 쿠키 없음');
    return NextResponse.json({ error: '인증 정보가 없습니다.' }, { status: 401 });
  }

  // 2. 닉네임 중복 체크
  const { data: exists, error: checkError } = await supabase
    .from('users')
    .select('id')
    .eq('nickname', nickname)
    .maybeSingle();

  if (checkError) {
    console.error('❌ 닉네임 중복 확인 실패:', checkError.message);
    return NextResponse.json({ error: '닉네임 확인 중 오류 발생' }, { status: 500 });
  }

  if (exists) {
    console.warn('⚠️ 이미 존재하는 닉네임:', nickname);
    return NextResponse.json({ error: '이미 사용 중인 닉네임입니다.' }, { status: 409 });
  }

  // 3. 닉네임 업데이트
  const { data: updated, error: updateError } = await supabase
    .from('users')
    .update({ nickname })
    .eq('kakao_id', kakaoId)
    .select(); // ✅ 업데이트된 결과 확인용

    console.log('📌 update 결과:', updated);


  if (updateError|| !updated || updated.length === 0 ) {
    console.error('❌ 닉네임 업데이트 실패 또는 대상 없음');
    if(updateError){
      console.error('업데이트 실패:', updateError.message);
    }
    return NextResponse.json({ error: '닉네임 등록 실패' }, { status: 500 });
  }

  console.log('✅ 닉네임 등록 성공:', nickname);
  console.log('📊 업데이트된 데이터:', updated);
  return NextResponse.json({ success: true });
}
