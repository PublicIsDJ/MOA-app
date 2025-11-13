'use client';

import Image from 'next/image';

interface CardDetailViewProps {
    cardNumber: number;
    totalCards: number;
    title: string;
    description: string;
    frontImage: string;
}

export function CardDetailView({
    cardNumber,
    totalCards,
    title,
    description,
    frontImage,
}: CardDetailViewProps) {
    return (
        <div className='flex flex-col items-center justify-center py-10'>
            {/* MARK: 카드 */}
            <section style={{ perspective: '1500px' }}>
                <div
                    className='relative w-[200px] h-[290px] animate-card-flip'
                    style={{
                        transformStyle: 'preserve-3d'
                    }}
                >
                    {/* 카드 앞면 */}
                    <div
                        className='absolute inset-0'
                        style={{
                            backfaceVisibility: 'hidden',
                            WebkitBackfaceVisibility: 'hidden'
                        }}
                    >
                        <Image
                            src={frontImage}
                            alt='카드 앞면'
                            fill
                            className='object-contain'
                        />
                    </div>
                    {/* 카드 뒷면 */}
                    <div
                        className='absolute inset-0'
                        style={{
                            backfaceVisibility: 'hidden',
                            WebkitBackfaceVisibility: 'hidden',
                            transform: 'rotateY(180deg)',
                            WebkitTransform: 'rotateY(180deg)'
                        }}
                    >
                    </div>
                </div>
            </section>

            {/* MARK: 카드 정보 */}
            <p className='rounded-[200px] bg-[#4466D1] text-white px-[26px] py-[6px] mt-[18px]'>
                {cardNumber} / {totalCards}
            </p>
            <h1 className='text-2xl font-bold mt-4'>{title}</h1>
            <p className='text-gray-600 mt-2'>{description}</p>
        </div>
    );
}

