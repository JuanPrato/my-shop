import { ReactNode } from "react";

interface Props {
    children: ReactNode;
    onClick?: () => void;
}

export default function RoundButton({children, onClick}: Props) {

    return (
        <div className="p-4 cursor-pointer hover:bg-slate-200 rounded-full" onClick={onClick}>
            {children}
        </div>
    );

}