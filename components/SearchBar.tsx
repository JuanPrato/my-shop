import { useState } from "react";
import { FaSearch } from "react-icons/fa";

interface Props {
  onSearch: (searchTerm: string) => void;
}

export default function SearchBar({ onSearch }: Props) {

  const [value, setValue] = useState('');

  function onChange(newValue: string) {
    setValue(newValue);
    onSearch(newValue);
  }

  return (
  <div className="flex items-center gap-2 bg-slate-200 rounded p-2">
      <div className="px-6 py-2 cursor-pointer rounded border border-slate-400 hover:bg-slate-100">
        <FaSearch />
      </div>
      <input
        type="text"
        className="rounded px-4 p-1 min-w-[250px] w-full"
        placeholder="Rueda"
        onChange={(e) => onChange(e.currentTarget.value)}
        value={value}
      />
    </div>
  );

}