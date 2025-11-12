'use client';

import { useRouter } from 'next/navigation';
import { CloseButton } from '@/shared/ui/cancle-button';

interface Props {
    title: string;
    showCloseButton?: boolean;
    onClose?: () => void;
    className?: string;
}

export function AuthHeader({ title, showCloseButton = true, onClose, className = '' }: Props) {
    const router = useRouter();

    const handleClose = () => {
        if (onClose) {
            onClose();
        } else {
            router.back();
        }
    };

    return (
        <div className={`w-full flex justify-between items-center ${className}`}>
            <div className="w-8"></div>
            <h1 className="text-xl font-bold text-gray-900">{title}</h1>
            {showCloseButton ? (
                <CloseButton status="default" size={32} onClick={handleClose} />
            ) : (
                <div className="w-8"></div>
            )}
        </div>
    );
}

