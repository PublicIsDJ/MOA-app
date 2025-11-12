'use client';

import { ButtonHTMLAttributes, ReactNode } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement>{
    status: 'default' | 'inactive'
    children: ReactNode;
    className?: string;
    size?: number;
}

// MARK: 버튼 컴포넌트
export function CloseButton({status, size, children, className='', type='button', ...props}: Props) {

  const utilsStyle = 'relative inline-flex items-center justify-center rounded-full';
  const defaultStyle = 'text-[#9C9C9C]';
  const inactiveStyle = 'bg-[#F3F4F6] text-[#9CA3AF]';
  

  return (
    <button
      type={type}
      className={`${utilsStyle} ${className} ${status === 'default' ? defaultStyle : inactiveStyle}`}
      style={{ width: size, height: size }}
      aria-label="닫기"
      {...props}
    >
      <span className="absolute block h-[2px] w-1/2 bg-current rotate-45 rounded-full" />
      <span className="absolute block h-[2px] w-1/2 bg-current -rotate-45 rounded-full" />
    </button>
  );
}
