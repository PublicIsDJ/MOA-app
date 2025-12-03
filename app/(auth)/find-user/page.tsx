'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AuthHeader } from '@/features/auth/ui/auth-header';
import { SlideToggle } from '@/shared/ui/slide-toggle';
import { Button } from '@/shared/ui/button';
import { InputBox } from '@/shared/ui/input-box';


export default function FindUserPage() {
    const router = useRouter();
    const [findType, setFindType] = useState<'id' | 'password'>('id');

    const toggleOptions = [
        { label: '아이디 찾기', value: 'id' },
        { label: '비밀번호 찾기', value: 'password' },
    ];

    return (
        <div className="relative min-h-screen flex flex-col bg-white">
            {/* MARK: 헤더 */}
            <AuthHeader title="계정 찾기" className="mt-5" />

            {/* MARK: 슬라이드 토글 */}
            <div className="mt-8">
                <SlideToggle
                    options={toggleOptions}
                    value={findType}
                    onChange={(value) => setFindType(value as 'id' | 'password')}
                    className="w-full"
                />
            </div>

            {/* MARK: 아이디 찾기 */}
            {findType === 'id' && (
                <div className="flex-1 flex flex-col mt-8 gap-[36px]">
                    <h1 className="text-xl font-bold text-gray-900">
                        아이디 찾기
                    </h1>

                    {/* MARK: 이름 입력 */}
                    <section id='find-name'>
                        <p className="text-sm font-medium text-gray-700 mb-2">이름</p>
                        <InputBox
                            name="userName"
                            placeholder="이름 입력"
                            type="text"
                            className="py-3"
                        />
                    </section>

                    {/* MARK: 휴대폰 번호 입력 */}
                    <section id='find-phone'>
                        <p className="text-sm font-medium text-gray-700 mb-2">휴대폰 번호</p>
                        <InputBox
                            name="phoneNumber"
                            placeholder="010-1234-5678"
                            type="tel"
                            className="py-3"
                        />
                    </section>

                    <Button className="w-full py-3 mt-auto mb-10">
                        아이디 찾기
                    </Button>
                </div>
            )}

            {/* MARK: 비밀번호 찾기 */}
            {findType === 'password' && (
                <div className="flex-1 flex flex-col mt-8">
                    <h1 className="text-xl font-bold text-gray-900 mb-3">
                        비밀번호 찾기
                    </h1>
                    <p className="text-sm text-gray-500 mb-6">
                        아이디와 정보를 입력해주세요
                    </p>

                    <div className="flex flex-col gap-9">
                        {/* MARK: 아이디 입력 */}
                        <section id='find-pw-id'>
                            <p className="text-sm font-medium text-gray-700 mb-2">아이디</p>
                            <InputBox
                                name="userId"
                                placeholder="아이디를 입력해주세요."
                                type="text"
                                className="py-3"
                            />
                        </section>

                        {/* MARK: 이름 입력 */}
                        <section id='find-pw-name'>
                            <p className="text-sm font-medium text-gray-700 mb-2">이름</p>
                            <InputBox
                                name="userName"
                                placeholder="이름 입력"
                                type="text"
                                className="py-3"
                            />
                        </section>

                        {/* MARK: 휴대폰 번호 입력 */}
                        <section id='find-pw-phone'>
                            <p className="text-sm font-medium text-gray-700 mb-2">휴대폰 번호</p>
                            <InputBox
                                name="phoneNumber"
                                placeholder="010-1234-5678"
                                type="tel"
                                className="py-3"
                            />
                        </section>
                    </div>

                    <Button status="default" className="w-full py-[12px] mt-auto mb-10" onClick={()=>router.push('/reset-pw')}>
                        비밀번호 변경하기
                    </Button>
                </div>
            )}
        </div>
    );
}