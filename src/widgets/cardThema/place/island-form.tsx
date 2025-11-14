'use client';

import { WithObject } from '@/features/cardThema/place/ui/with-object';
import { WithWho } from '@/features/cardThema/place/ui/with-who';
import { MostMiss } from '@/features/cardThema/place/ui/most-miss';

export function IslandForm() {
    return (
        <div className='flex flex-col gap-6'>
            {/* MARK: 가져갈 물건 */}
            <section className='flex flex-col'>
                <WithObject />
            </section>

            {/* MARK: 함께 있고 싶은 존재 */}
            <section className='flex flex-col'>
                <WithWho />
            </section>

            {/* MARK: 가장 그리울 것 */}
            <section className='flex flex-col'>
                <MostMiss />
            </section>
        </div>
    );
};