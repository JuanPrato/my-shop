import { ReactNode, useRef } from "react";

interface Props {
    children: ReactNode;
}

export let scrollTo: (to: number) => void;

function Layout({ children }: Props) {
    
    const divRef = useRef<any>();

    scrollTo = (to: number) => {
        divRef.current?.scrollTo({top: to})
    }

    return (
        <div className="bg-slate-400 w-screen h-screen overflow-x-hidden scroll-smooth" ref={divRef}>
            <div className="max-w-[1200px] sm:w-[90%] w-full m-auto h-full flex flex-col justify-between">
                {children}
            </div>
        </div>
    );

}

export default Layout;