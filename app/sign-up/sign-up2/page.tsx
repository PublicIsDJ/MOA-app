'use client';

import { Button } from '@/shared/ui/button';
import {InputBox} from '@/shared/ui/input-box';

export default function FirstLoginPage() {

    return (
        <div className="min-h-screen flex flex-col items-start bg-white px-0 py-10">
            <div className="felx self-center justify-center"><h1 className="text-xl font-bold self-center text-gray-900 mb-3">회원가입</h1></div>
            <div className="flex self-center justify-center mt-4 mb-4 space-x-2">
                <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                <div className="w-2 h-2 rounded-full bg-gray-300"></div>
            </div>

            <div className="flex flex-col justify-center mt-4 mb-2">
                <h1 className="text-xl font-bold text-gray-900 mb-3 ">인증번호를 입력해주세요</h1>
                <p className='mt-[7px]'>인증번호 입력</p>
            </div>

            <div className="flex flex-row w-full space-x-2">
                    <InputBox name="code" placeholder="인증번호 입력" type="numeric" className='"basis-3/4 grow mt-[3px]'/>
                    <Button status="default" className="basis-1/4 grow py-[18px] mt-[3px] justify-center items-center text-center bg-[#4466D1]"> 재전송 </Button>
            </div>
            
            


            {/* 하단 버튼 */}
            <Button status="default" className="mt-auto py-[12px] mt-[30px]"> 다음으로 </Button>
        </div>
    );
}
