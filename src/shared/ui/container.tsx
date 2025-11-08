import React from 'react';

interface Props {
    children?: React.ReactNode;
    className?: string;
}

// MARK: 전체 컨테이너 레이아웃을 조정
// TODO: 반응형 잡기
export function Container({ children, className}: Props) {
    return (
        <div className={`${className} w-full h-full px-[16px]`}>
            {children}
        </div>
    )
}