'use client';

import { TalentSelector } from '@/features/cardThema/time/ui/my-talent';
import { WantNowSelector } from '@/features/cardThema/time/ui/talent-want-now';
import type { StageData } from '@/features/cardThema/time/types';

interface TalentFormProps {
    data: StageData;
    onChange: (data: StageData) => void;
}

export default function TalentForm({ data, onChange }: TalentFormProps) {
    return (
        <div className="card-input-form">
            <section id='time-talent'>
                <h1 className="text-lg font-semibold mb-2">내가 잘하는 것은?</h1>
                <TalentSelector
                    value={data.myTalent}
                    onChange={(value) => onChange({ ...data, myTalent: value })}
                />
            </section>

            <section id='time-now-i-want'>
                <h1 className="text-lg font-semibold mb-2">지금 현재 하고싶은 것은?</h1>
                <WantNowSelector
                    value={data.wantNow}
                    onChange={(value) => onChange({ ...data, wantNow: value })}
                />
            </section>
        </div>
    );
}