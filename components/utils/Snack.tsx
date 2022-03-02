import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";

interface Props {
    id: number;
    message: string;
    color?: string;
    textStyle?: string;
    duration?: number;
    onExpire: (id: number) => void;
}

export default function Snack({ id, message, color, duration, onExpire}: Props) {

    const [hide, setHide] = useState(false);

    useEffect(() => {
        const t = setTimeout(() => {
            setHide(true);
            onExpire(id);
        }, duration || 3000);

        return () => clearTimeout(t);
    }, []);

    return (
        <div className={`m-4 p-4 rounded flex items-center gap-3 border border-black border-opacity-20 transition-all overflow-hidden ${hide && 'opacity-0'} ${color}`}>
            <p className="font-semibold">{ message }</p>
            <button className="bg-black bg-opacity-0 hover:bg-opacity-20 rounded-full p-2 border border-black border-opacity-20" onClick={() => setHide(true)}>
                <FaTimes />
            </button>
        </div>
    );

}