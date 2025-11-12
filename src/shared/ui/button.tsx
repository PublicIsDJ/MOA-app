'use client';

import { ButtonHTMLAttributes, ReactNode } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement>{
    status?: 'default' | 'inactive'
    children: ReactNode;
    className?: string;
}

// MARK: 버튼 컴포넌트
export function Button({status='default', children, className='', type='button', ...props}: Props) {

    const utilsStyle = 'w-full rounded rounded-4 flex flex-col items-center justify-center'
    const defualtStyle = 'bg-[#3E56F6] text-white'
    const inactiveStyle = 'bg-[#F6F6F6] text-[#9C9C9C]'
    return (
        <button
            type={type}
            className={`${utilsStyle} ${className} ${status === 'default' ? defualtStyle : inactiveStyle}`}
            {...props}
        >
            {children}
        </button>
    );

};