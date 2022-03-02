import useScroll from "hooks/useScroll";
import { FaArrowUp } from "react-icons/fa";
import Button from "./utils/Button";

export default function Footer() {

    const scroll = useScroll();

    return (
        <div className="w-full flex justify-center bg-slate-300 px-3 py-6 rounded-t">
            <Button onClick={() => {scroll(0)}}>
                <div className="flex items-center gap-3 justify-center md:max-w-min py-1">
                    <p className="whitespace-nowrap">VOLVER ARRIBA</p>
                    <FaArrowUp />
                </div>
            </Button>
        </div>
    );

}