import { useMemo } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface Props {
    label: string;
    placeholder?: string;
    email?: boolean;
    secure?: boolean;
    register: UseFormRegisterReturn;
    error?: string;
}

export default function TextInput({ label, register, placeholder, email, secure, error }: Props) {
    
    const classes = useMemo(() => `rounded py-2 px-3 w-full text-xl md:text-md ${!!error && "border border-red-500"}`, [error]);

    return (
        <div className="p-1 w-full">
            <p className="py-2 text-md">{label}:</p>
            <input 
                className={classes}
                type={!secure ? (!email ? "text" : "email") : "password"}
                placeholder={placeholder}
                autoComplete={"off"}
                {...register}
            />
            {
                !!error && (
                    <p className="text-red-500 text-sm">{error}</p>
                )
            }
        </div>
    )

}