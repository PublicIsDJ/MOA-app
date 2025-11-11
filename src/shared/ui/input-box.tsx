import { forwardRef, InputHTMLAttributes } from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    error?: string;
}


export const InputBox = forwardRef<HTMLInputElement, Props>(
    ({ error, className='', ...props}, ref) => {
        return (
        <>
                <input
                    ref={ref}
                    type='input'
                    className={`w-full rounded rounded-4 bg-[#F6F6F6] text-[#9C9C9C] border border-gray-200 outline-none pl-4 focus:ring-2 focus:ring-[#3E56F6] placeholder:text-gray-500 ${error ? 'border-red-400 focus:ring-red-500' : ''} ${className}`}
                    {...props}
                />
        </>);

    }
);


InputBox.displayName = 'InputBox';