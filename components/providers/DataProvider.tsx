import { createContext, ReactNode, useEffect, useState } from "react";
import { fetchQuery } from "sanity";
import { Category } from "shared/types/Category";
import { Item } from "shared/types/Item";

export type DataContext = {
    products: Item[];
    categories: Category[];
}

export let dataContext = createContext<DataContext>({
    products: [],
    categories: [],
});

function productMapper (p: any): Item { 
    return {
      id: p._id,
      name: p.title,
      price: p.defaultProductVariant.price,
      categories: p.categories.map((c: any) => c.title),
      photoUrl: p.defaultProductVariant.images[0].asset.url
    }
  
  }
  
  const categoryMapper = (c: any): Category => {
    return {
      id: c._id,
      name: c.title
    }
  }

interface Props {
    children: ReactNode
}

export default function DataProvider({ children }: Props) {

    const [items, setItems] = useState<Item[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
            (async () => {
                const { products, categories } = await fetch('/api/get-data').then(r => r.json());
                setItems(products.map(productMapper));
                setCategories(categories.map(categoryMapper));
            })()

    }, []);

    return (
        <dataContext.Provider value={{
            products: items,
            categories: categories
        }}>
            { children }
        </dataContext.Provider>
    )

}