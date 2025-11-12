'use client';

import { Button } from '@/shared/ui/button';
import { CloseButton } from '@/shared/ui/cancle-button';
import {InputBox} from '@/shared/ui/input-box';


export default function FirstLoginPage() {

    return (
        <div className="min-h-screen flex flex-col items-start justify-between bg-white px-0 py-10">
            
            <div className= "w-full grid grid-cols-3 item-center justify-center">
                <h1 className="col-start-2 justify-self-center text-xl font-bold text-gray-900">회원가입</h1>
                <CloseButton status="default" size={32} className="col-start-3 justify-self-end"/>
            </div>

            <div className="flex self-center justify-center mt-4 space-x-2">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                <div className="w-2 h-2 rounded-full bg-gray-300"></div>
            </div>

            <div className="flex flex-col justify-center mt-4 mb-2">
                <h1 className="text-xl font-bold text-gray-900 mb-3">
                    회원가입을 위해
                    <br />
                    본인인증이 필요해요
                </h1>
            </div>
            <p className='mt-[7px]'>이름</p>
            <InputBox name="name" placeholder="이름 입력" type="text" className='py-[12px] mt-[3px]'/>
            <p className='mt-[5px]'>주민등록번호</p>
            <InputBox name="ID" placeholder="000000-0******" type="numeric" className='py-[12px] mt-[3px]'/>
            <p className='mt-[5px]'>통신사 선택</p>
            <Button status="inactive" className="py-[12px] mt-[3px] justify-start items-start text-left"> 통신사 선택 </Button>
            <p className='mt-[5px]'>휴대폰 번호</p>
            <InputBox name="Mobile" placeholder="휴대폰 번호 입력('-')제외" type="text" className='py-[12px] mt-[3px]'/>




            {/* 하단 버튼 */}
            <Button status="default" className="py-[12px] mt-[30px]"> 본인 인증하기 </Button>
        </div>
    );
}
