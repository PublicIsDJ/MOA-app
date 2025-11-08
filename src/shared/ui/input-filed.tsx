import { forwardRef, InputHTMLAttributes } from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    error?: string;
}


export const InputField = forwardRef<HTMLInputElement, Props>(
    ({ error, className='', ...props}, ref) => {
        return (
        <>
                <input
                    ref={ref}
                    type='input'
                    className={`w-full border-b border-[#D9D9D9] focus:outline-none focus-visible:border-b-[#3E56F6] transition-colors placeholder:text-gray-500 pb-3 ${className}`}
                    {...props}
                />
        </>);

    }
);


InputField.displayName = 'InputField';