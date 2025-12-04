'use client';

import { ReactNode } from 'react';

interface SelectionItem {
    icon: string;
    title: string;
    description?: string;
    name?: string;
}

interface SelectionGridProps {
    title: string;
    items: SelectionItem[];
    selectedIndex: number | null;
    onSelect: (index: number) => void;
    columns?: 2 | 3;
    showDescription?: boolean;
}

// MARK: 선택 그리드 컴포넌트
// 카드 테마에서 반복되는 선택 UI를 공통화
export function SelectionGrid({
    title,
    items,
    selectedIndex,
    onSelect,
    columns = 2,
    showDescription = false,
}: SelectionGridProps) {
    const gridCols = columns === 3 ? 'grid-cols-3' : 'grid-cols-2';
    const aspectRatio = columns === 3 ? 'aspect-[98/72]' : 'aspect-[149/80]';

    return (
        <section>
            <h1 className="text-lg font-semibold mb-4">{title}</h1>
            <div className={`grid ${gridCols} gap-3`}>
                {items.map((item, index) => {
                    const isSelected = selectedIndex === index;
                    const displayName = item.name || item.title;

                    return (
                        <button
                            key={index}
                            type="button"
                            onClick={() => onSelect(index)}
                            className={`w-full ${aspectRatio} rounded-[12px] flex flex-col items-center justify-center gap-1 transition-all ${
                                isSelected
                                    ? 'bg-[#4466D1] text-white'
                                    : 'bg-white text-gray-900 hover:bg-gray-50'
                            }`}
                        >
                            <p className={columns === 3 ? 'text-xl' : 'text-2xl'}>{item.icon}</p>
                            <p className={`font-medium ${columns === 3 ? 'text-xs' : 'text-sm'}`}>
                                {displayName}
                            </p>
                            {showDescription && item.description && (
                                <p className={`text-xs ${isSelected ? 'text-white/80' : 'text-gray-500'}`}>
                                    {item.description}
                                </p>
                            )}
                        </button>
                    );
                })}
            </div>
        </section>
    );
}

// MARK: 선택 그리드 컨테이너
// 여러 SelectionGrid를 감싸는 폼 컨테이너
interface SelectionFormContainerProps {
    children: ReactNode;
    className?: string;
}

export function SelectionFormContainer({ children, className = '' }: SelectionFormContainerProps) {
    return (
        <div className={`flex-1 flex flex-col gap-8 bg-[#F6F6F6] rounded-[20px] px-2 py-10 ${className}`}>
            {children}
        </div>
    );
}

