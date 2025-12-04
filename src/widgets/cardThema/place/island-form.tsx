'use client';

import { WithObject } from '@/features/cardThema/place/ui/with-object';
import { WithWho } from '@/features/cardThema/place/ui/with-who';
import { MostMiss } from '@/features/cardThema/place/ui/most-miss';
import type { IslandData } from '@/features/cardThema/place/types';

interface IslandFormProps {
    data: IslandData;
    onChange: (data: IslandData) => void;
}

export function IslandForm({ data, onChange }: IslandFormProps) {
    return (
        <div className='flex flex-col gap-6'>
            {/* MARK: 가져갈 물건 */}
            <section className='flex flex-col'>
                <WithObject
                    value={data.object}
                    onChange={(value) => onChange({ ...data, object: value })}
                />
            </section>

            {/* MARK: 함께 있고 싶은 존재 */}
            <section className='flex flex-col'>
                <WithWho
                    value={data.withWho}
                    onChange={(value) => onChange({ ...data, withWho: value })}
                />
            </section>

            {/* MARK: 가장 그리울 것 */}
            <section className='flex flex-col'>
                <MostMiss
                    value={data.mostMiss}
                    onChange={(value) => onChange({ ...data, mostMiss: value })}
                />
            </section>
        </div>
    );
}