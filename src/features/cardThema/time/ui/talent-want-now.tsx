'use client';

export function NowIWant() {
    return (
        <>
            <textarea 
            className='w-full aspect-[310/110] resizen-none bg-white rounded-[12px] p-3 mt-2  focus:outline-[#3E56F6] focus:transition-colors'
            placeholder='현재의 무대를 적어주세요'
            />

            <textarea 
                className='w-full aspect-[310/110] resizen-none bg-white rounded-[12px] p-3 mt-3 focus:outline-[#3E56F6] focus:transition-colors'
                placeholder='미래의 무대를 적어주세요'
            />
        </>
    );
}