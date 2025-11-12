'use client';

import { AuthHeader } from '@/features/auth/ui/auth-header';
import { Button } from '@/shared/ui/button';
import { useRouter } from 'next/navigation';
import { InputBox } from '@/shared/ui/input-box';

export default function ResetPassword() {
    const router = useRouter();

    return (
        <>
        <div className='relative flex flex-col min-h-screen bg-white gap-[20px]'>
            {/* MARK: 헤더 */}
            <AuthHeader title="비밀번호 변경" className="mt-5" />
            <h1 className='whitespace-pre mt-16 mb-9 text-left text-xl font-bold text-gray-900'>{'개인정보 보호를 위해\n비밀번호를 변경해주세요'}</h1>

            <section id='reset-pw'>
                <label className='block'>신규 비밀번호</label>
                <InputBox
                    name="new-password"
                    placeholder="비밀번호 입력"
                    type="password"
                    className="py-3 flex-3"
                />
            </section>

            
            <section id='reset-pw-confirm'>
                <label className='block'>비밀번호 확인</label>
                <InputBox
                    name="new-password-confirm"
                    placeholder="비밀번호 확인"
                    type="password"
                    className="py-3 flex-3"
                />
            </section>

            <Button
                className='absolute bottom-10 py-[12px]'
                onClick={()=>router.push('/login')}
            >비밀번호 변경</Button>
        </div>
        </>
    );
}