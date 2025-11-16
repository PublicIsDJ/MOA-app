'use client';

import { TalentSelector } from '@/features/cardThema/time/ui/my-talent';
import { NowIWant } from '@/features/cardThema/time/ui/talent-want-now';

// TODO: props 정의 (formData)
export default function TalentForm() {
    return (
        <div className="card-input-form">
            <section id='time-talent'>
                <h1>내가 잘하는 것은?</h1>
                <TalentSelector />
            </section>

            <section id='time-now-i-want'>
                <h1>지금 현재 하고싶은 것은?</h1>
                <NowIWant/>
            </section>
        </div>
    );
}