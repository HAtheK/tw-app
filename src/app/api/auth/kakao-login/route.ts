import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const supabase = createClient();

  try {
    const body = await req.json();
    const { kakaoId, nickname, email, phone } = body;

    if (!kakaoId || !email) {
      return NextResponse.json({ error: '필수 정보 누락' }, { status: 400 });
    }

    // 1. 사용자 존재 여부 확인
    const { data: existingUser, error: selectError } = await supabase
      .from('users')
      .select('*')
      .eq('kakao_id', kakaoId)
      .single();

    if (selectError && selectError.code !== 'PGRST116') {
      console.error('사용자 조회 오류:', selectError);
      return NextResponse.json({ error: 'DB 조회 실패' }, { status: 500 });
    }

    // 2. 신규 유저면 insert
    if (!existingUser) {
      const { error: insertError } = await supabase.from('users').insert([
        {
          kakao_id: kakaoId,
          kakao_nickname: nickname,
          email,
          phone,
          created_at: new Date().toISOString(),
        },
      ]);

      if (insertError) {
        console.error('회원 등록 실패:', insertError);
        return NextResponse.json({ error: '회원 등록 실패' }, { status: 500 });
      }

      // 신규 사용자는 닉네임 설정 필요
      return NextResponse.json({ needNickname: true });
    }

    // 3. 기존 유저일 경우 별칭(nickname) 존재 여부 판단
    const hasNickname = !!existingUser.nickname;

    return NextResponse.json({
      needNickname: !hasNickname,
      user: existingUser,
    });
  } catch (err) {
    console.error('예외 발생:', err);
    return NextResponse.json({ error: '서버 오류' }, { status: 500 });
  }
}
