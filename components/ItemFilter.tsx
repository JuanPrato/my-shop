import { useState } from "react";
import { FaCheck } from "react-icons/fa";

interface Props {
    name: string;
    onSelect: () => void;
    selected: boolean;
}

export default function ItemFilter({ name, onSelect, selected }: Props) {

    function onClick() {
        onSelect()
    }

    return (
        <div 
            className="px-3 py-4 transition-colors hover:bg-yellow-100 border-slate-400 flex justify-evenly items-center gap-2 border-r last-of-type:border-none"
            onClick={onClick}
        >
            <p className='font-semibold text-center whitespace-nowrap'>{ name }</p>
            {
                selected && <FaCheck/>
            }
        </div>
    );

}