'use client';

interface SlideToggleOption {
    label: string;
    value: string;
}

interface Props {
    options: SlideToggleOption[];
    value: string;
    onChange: (value: string) => void;
    className?: string;
}

// MARK: 슬라이드 토글 (밑줄 스타일 탭 네비게이션)
export function SlideToggle({ options, value, onChange, className = '' }: Props) {
    const selectedIndex = options.findIndex(opt => opt.value === value);

    return (
        <div className={`relative flex border-b border-gray-200 full-bleed ${className}`}>
            {options.map((option) => (
                <button
                    key={option.value}
                    type="button"
                    onClick={() => onChange(option.value)}
                    className={`
                        flex-1 py-3 px-4 text-base font-medium transition-colors duration-300
                        ${value === option.value ? 'text-[#3E56F6]' : 'text-gray-400'}
                    `}
                >
                    {option.label}
                </button>
            ))}

            {/* MARK: 파란색 밑줄 (슬라이드 애니메이션) */}
            <div
                className="absolute bottom-0 h-[2px] bg-[#3E56F6] transition-all duration-300 ease-in-out"
                style={{
                    left: `${selectedIndex * (100 / options.length)}%`,
                    width: `${100 / options.length}%`,
                }}
            />
        </div>
    );
}

