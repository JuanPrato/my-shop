import useCategories from "hooks/useCategories";
import useProducts from "hooks/useProducts";
import { useEffect, useState } from "react";
import ItemsList from "../components/ItemsList";
import { Item } from "../shared/types/Item";

const Home = () => {

  const products = useProducts();
  const categories = useCategories();

  const [itemsToPass, setItemsToPass] = useState<Item[]>(products);
  const [selectedFilter, setSelectedFilter] = useState<string>('');

  function onFilterChange(filter: string) {
    setSelectedFilter((f) => {
      if (f === filter) {
        return '';
      }
      return filter;
    });
  }

  useEffect(() => {
    if (selectedFilter === '') {
      setItemsToPass(products);
      return
    }
    setItemsToPass(products.filter(i => i.categories.includes(selectedFilter)));
  }, [products, selectedFilter]);

  return (
    <div className="flex flex-col mt-2">
      <ItemsList items={itemsToPass} onFilterChange={onFilterChange} categories={categories}/>
    </div>
  );
};

export default Home;
