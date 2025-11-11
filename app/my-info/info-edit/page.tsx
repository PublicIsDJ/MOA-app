'use client'

import { Button } from '@/shared/ui/button';
import { CloseButton } from '@/shared/ui/cancle-button';
import { InputBox } from '@/shared/ui/input-box';

export default function infoEdit() {

    return(
        <div className="min-h-screen bg-white">
            <div className="h-6"></div>
            <div className= "w-full grid grid-cols-3 item-center justify-center">
                <h1 className="col-start-2 justify-self-center text-xl font-bold text-gray-900 py-1">내정보 수정</h1>
                <CloseButton status="default" size={32} className="col-start-3 justify-self-end"/>
            </div>
        </div>

        
    )

}