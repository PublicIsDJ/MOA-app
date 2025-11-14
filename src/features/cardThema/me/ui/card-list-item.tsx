'use client';
// TODO: shared로 분리
import Image from 'next/image';

interface Props {
    title: string;
    icon: string;
    onClick?: () => void;
    delay?: number;
}

// MARK: 카드 리스트 아이템 컴포넌트
export function CardListItem({ title, icon, onClick, delay = 0 }: Props) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="flex items-center justify-between bg-white rounded-[12px] py-7 px-4 border border-[#D9D9D9] shadow-[0_4px_10px_rgba(0,0,0,0.10)] w-full transition-shadow hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)] animate-fade-in-up"
            style={{ animationDelay: `${delay}ms` }}
        >
            <div className='flex items-center gap-[30px]'>
                <div className='relative min-w-[34px] aspect-[34/49]'>
                    <Image
                        src={icon}
                        alt='아이콘'
                        fill
                        className='object-contain'
                    />
                </div>
                <h2 className='text-lg font-medium text-gray-900'>{title}</h2>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" className='w-2.5 h-[18px] md:w-3 md:h-5 flex-shrink-0' viewBox="0 0 10 18" fill="none">
                <path d="M1.27495 9.65164e-05C1.57495 9.65426e-05 1.87495 0.100098 2.07495 0.400098L9.57495 7.9001C10.075 8.4001 10.075 9.1001 9.57495 9.6001L2.07495 17.1001C1.57495 17.6001 0.87495 17.6001 0.37495 17.1001C-0.12505 16.6001 -0.125049 15.9001 0.374951 15.4001L7.17495 8.7001L0.474952 2.0001C-0.0250478 1.5001 -0.0250478 0.800098 0.474952 0.300098C0.674952 0.100098 0.974953 9.64902e-05 1.27495 9.65164e-05Z" fill="#D9D9D9"/>
            </svg>
        </button>
    );
}

