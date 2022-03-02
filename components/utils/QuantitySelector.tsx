import { Dispatch, SetStateAction } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import RoundButton from "./RoundButton";

interface Props {
    value: number;
    setValue: Dispatch<SetStateAction<number>>;
}

export default function QuantitySelector({ value, setValue }: Props) {

    return (
        <div className="flex items-center gap-3 my-3">
            <RoundButton onClick={() => setValue((v) => v > 1 ? v - 1 : v)}><FaMinus /></RoundButton>
            <input value={value} onChange={(e) => setValue(Number(e.currentTarget.value))} className="rounded p-2 text-center w-full min-w-[50px] md:max-w-[100px]"/>
            <RoundButton onClick={() => setValue((v) => v + 1)}><FaPlus /></RoundButton>
        </div>
    );

}