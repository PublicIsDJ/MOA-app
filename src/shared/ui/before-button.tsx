'use client';

import { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement>{
    status: 'default' | 'inactive'
    className?: string;
    size?: number;
}

// MARK: 닫기 버튼 컴포넌트
export function BeforeButton({status, size, className='', type='button', ...props}: Props) {

  const utilsStyle = 'relative inline-flex items-center justify-center rounded-full';
  const defaultStyle = 'text-[#9C9C9C]';
  const inactiveStyle = 'bg-[#F3F4F6] text-[#9CA3AF]';
  

  return (
    <button
      type={type}
      className={`${utilsStyle} ${className} ${status === 'default' ? defaultStyle : inactiveStyle}`}
      style={{ width: size, height: size }}
      aria-label="이전"
      {...props}
    >
      <span className="absolute block left-[28%] h-[2px] w-[38%] bg-current rotate-45 origin-[10%_50%] rounded-full" />
      <span className="absolute block left-[28%] h-[2px] w-[38%] bg-current -rotate-45 origin-[10%_50%] rounded-full" />
      
    </button>
  );
}
