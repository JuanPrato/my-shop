import { useContext } from "react";
import { dataContext } from "components/providers/DataProvider";

export default function useCategories() {

    const { categories } = useContext(dataContext);
    return categories;
    
}