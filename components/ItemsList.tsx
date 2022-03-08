import { useEffect, useState } from "react";
import { Category } from "shared/types/Category";
import { Item } from "../shared/types/Item";
import Filters from "./Filters";
import ItemCard from "./ItemCard";
import SearchBar from "./SearchBar";

interface Props {
    items: Item[];
    onFilterChange: (filter: string) => void;
    categories: Category[];
}

export default function ItemsList({ items, onFilterChange, categories }: Props) {

    const [itemsToShow, setItemsToShow] = useState(items);

    useEffect(() => {
        setItemsToShow(items);
    }, [items]);

    function onSearch(searchTerm: string) {
        setItemsToShow(items.filter(i => i.name.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())));
    }

    return (
        <div className="h-full flex-grow py-2 rounded flex flex-col gap-3">
            <div className="flex flex-col gap-3">
                <SearchBar onSearch={onSearch}/>
                <Filters onFilterChange={onFilterChange} categories={categories}/>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {
                itemsToShow.map((item) => <ItemCard key={item.id} item={item}/>)
                }
            </div>
      </div>
    );

}