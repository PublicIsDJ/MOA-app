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
    const [isCarrierModalOpen, setIsCarrierModalOpen] = useState(false);
    const [selectedCarrier, setSelectedCarrier] = useState<string>('');

    const toggleOptions = [
        { label: '아이디 찾기', value: 'id' },
        { label: '비밀번호 찾기', value: 'password' },
    ];

    const carriers = ['SKT', 'KT', 'LG U+', '알뜰폰'];

    // MARK: 통신사 선택
    const handleCarrierSelect = (carrier: string) => {
        setSelectedCarrier(carrier);
        setIsCarrierModalOpen(false);
    };

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

                    {/* MARK: 통신사 선택 */}
                    <section id='find-carrier'>
                        <p className="text-sm font-medium text-gray-700 mb-2">통신사</p>
                        <button
                            type="button"
                            onClick={() => setIsCarrierModalOpen(true)}
                            className="w-full py-3 px-4 bg-gray-100 rounded-lg text-left text-gray-900"
                        >
                            {selectedCarrier || '통신사 선택'}
                        </button>
                    </section>

                    {/* MARK: 휴대폰 번호 입력 */}
                    <section id='find-phone'>
                        <p className="text-sm font-medium text-gray-700 mb-2">휴대폰 번호</p>
                        <div className='flex items-center gap-2'>
                            <InputBox
                                name="phoneNumber"
                                placeholder="010-1234-5678"
                                type="tel"
                                className="py-3 flex-3"
                            />
                            <Button className='flex-1 py-3'>인증번호</Button>
                        </div>
                    </section>

                    {/* MARK: 인증 번호 입력 */}
                    <section id='find-verify-number'>
                        <p className="text-sm font-medium text-gray-700 mb-2">인증번호</p>
                        <div className='flex items-center gap-2'>
                            <InputBox
                                name="verifyCode"
                                placeholder="인증번호 입력"
                                type="text"
                                className="py-3 flex-3"
                            />
                            <Button className='flex-1 py-3'>확인</Button>
                        </div>
                    </section>

                    <Button className="w-full py-3 mt-auto mb-10">
                        아이디 찾기
                    </Button>
                </div>
            )}

            {/* MARK: 통신사 선택 모달 (오버레이 + 밑에서 올라오는 모달) */}
            {isCarrierModalOpen && (
                <>
                    {/* MARK: 오버레이 배경 */}
                    <div
                        className="fixed inset-0 bg-black/30 z-40 transition-opacity duration-300"
                        onClick={() => setIsCarrierModalOpen(false)}
                    />

                    {/* MARK: 밑에서 올라오는 모달 */}
                    <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-50 p-8 pb-16 animate-slide-up">
                        <h2 className="text-xl font-bold text-gray-900 mb-8">통신사 선택</h2>
                        <div className="flex flex-col gap-4">
                            {carriers.map((carrier) => (
                                <button
                                    key={carrier}
                                    type="button"
                                    onClick={() => handleCarrierSelect(carrier)}
                                    className={`
                                        w-full py-3 px-4 text-left transition-colors
                                        ${selectedCarrier === carrier
                                            ? 'bg-[#3E56F6] rounded-lg text-white'
                                            : 'text-gray-900 border-b border-gray-200'}
                                    `}
                                >
                                    {carrier}
                                </button>
                            ))}
                        </div>
                    </div>
                </>
            )}

            {/* MARK: 비밀번호 찾기 */}
            {findType === 'password' && (
                <div className="flex-1 flex flex-col mt-8">
                    <h1 className="text-xl font-bold text-gray-900 mb-3">
                        비밀번호 찾기
                    </h1>
                    <p className="text-sm text-gray-500 mb-6">
                        아이디와 휴대폰 번호를 입력해주세요
                    </p>



                    <div className="flex flex-col gap-9">
                        {/* MARK: 통신사 선택 */}
                        <section id='find-pw-carrier'>
                            <p className="text-sm font-medium text-gray-700 mb-2">통신사</p>
                            <button
                                type="button"
                                onClick={() => setIsCarrierModalOpen(true)}
                                className="w-full py-3 px-4 bg-gray-100 rounded-lg text-left text-gray-900"
                            >
                                {selectedCarrier || '통신사 선택'}
                            </button>
                        </section>

                        {/* MARK: 휴대폰 번호 입력 */}
                        <section id='find-pw-phone'>
                            <p className="text-sm font-medium text-gray-700 mb-2">휴대폰 번호</p>
                            <div className='flex items-center gap-2'>
                                <InputBox
                                    name="phoneNumber"
                                    placeholder="010-1234-5678"
                                    type="tel"
                                    className="py-3 flex-3"
                                />
                                <Button className='flex-1 py-3'>인증번호</Button>
                            </div>
                        </section>

                        {/* MARK: 아이디 입력 */}
                        <section id='find-pw-id'>
                            <p className="text-sm font-medium text-gray-700 mb-2">아이디</p>
                            <div className='flex items-center gap-2'>
                                <InputBox
                                    name="userId"
                                    placeholder="아이디를 입력해주세요."
                                    type="text"
                                    className="py-3 flex-3"
                                />
                            </div>
                        </section>

                        {/* MARK: 일름 입력 */}
                        <section id='find-pw-name'>
                            <p className="text-sm font-medium text-gray-700 mb-2">이름</p>
                            <div className='flex items-center gap-2'>
                                <InputBox
                                    name="userName"
                                    placeholder="이름 입력"
                                    type="text"
                                    className="py-3 flex-3"
                                />
                            </div>
                        </section>
                    </div>

                    <Button status="default" className="w-full py-[12px] mt-auto mb-10" onClick={()=>router.push('/reset-pw')}>
                        비밀번호 변경하기
                    </Button>
                </div>
            )}
        </div>
    );
};