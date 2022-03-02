import { useState } from "react";
import { Category } from "shared/types/Category";
import ItemFilter from "./ItemFilter";

interface Props {
    onFilterChange: (filter: string) => void;
    categories: Category[];
}

export default function Filters({ onFilterChange, categories }: Props) {

    const [selected, setSelected] = useState<string>();

    const onFilterPress = (selection: string) => {

        if (selection === selected) {
            setSelected('');
            onFilterChange('');
            return;
        }
        setSelected(selection);
        onFilterChange(selection);
    }

    return (
        <div className='bg-slate-100 rounded px-3 w-full select-none grid place-items-center overflow-x-auto scrollbar-hide'>
            <div className="flex">
            {
                categories.map(c => 
                                <ItemFilter 
                                    key={c.id} 
                                    name={c.name} 
                                    onSelect={() => onFilterPress(c.name)}
                                    selected={selected === c.name}
                                />)
            }
            </div>
        </div>
    );

}