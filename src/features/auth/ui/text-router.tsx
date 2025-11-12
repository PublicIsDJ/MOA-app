'use client';

import { useRouter } from "next/navigation";

interface Props {
    className?: string;
}

export function TextRouter({ className }: Props) {
    const router = useRouter();
    return (
        <>
            {/* MARK: 전체컨테이너 */}
            <div className={`${className} w-full flex justify-center font-[500px] text-[12px] text-[##747780] gap-[15px]`}>
                <button
                    onClick={()=>router.push('/find-user')}
                >아이디 찾기</button>
                <p>|</p>
                <button
                    onClick={()=>router.push('/find-user')}
                >비밀번호 찾기</button>
                <p>|</p>
                <button
                    onClick={()=>router.push('/sign-up')}
                >회원가입</button>
            </div>
        </>
    );
}