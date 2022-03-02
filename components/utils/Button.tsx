import { forwardRef, ReactNode } from "react";

interface Props {
    children: ReactNode;
    onClick?: () => void;
}

function Button({ children, onClick }: Props, ref: any) {

    return (
        <div className="font-semibold bg-slate-400 px-3 py-3 md:py-1 rounded select-none hover:bg-slate-500 cursor-pointer max-w-fit max-h-fit transition-colors" onClick={onClick}>
            {children}
        </div>
    )

}

export default forwardRef(Button);