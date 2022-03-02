import { dataContext } from "components/providers/DataProvider";
import { useContext } from "react";

export default function useProducts() {
    const {products} = useContext(dataContext);
    return products;
}