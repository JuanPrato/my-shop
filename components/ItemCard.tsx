import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import useCart from "../hooks/useCart";
import useFormatter from "../hooks/useFormatter";
import { Item } from "../shared/types/Item";
import Loading from "./utils/Loading";

interface Props {
    item: Item;
}

export default function ItemCard({ item }: Props) {

    const { addItem } = useCart();
    const formatter = useFormatter();
    const [imageLoading, setImageLoading] = useState(true);

    const imageClasses = useMemo(() => ["h-full w-full object-contain", imageLoading && "hide"].join(" "), [imageLoading]);

    return (
        <div className="w-full h-[400px] bg-slate-200 p-4 rounded flex flex-col relative transition-transform md:hover:scale-110 hover:z-10 hover:shadow-lg">
            <div className="flex-grow w-full relative overflow-hidden">
                {
                    imageLoading && (
                        <div className="w-full h-full grid place-items-center"><Loading/></div>
                    )
                }
                <Image
                    src={item.photoUrl}
                    alt="item product image"
                    className={imageClasses}
                    layout="fill"
                    onLoadingComplete={() => setImageLoading(false)}
                />
            </div>
            <div className="h-[40%] mt-2 flex flex-col justify-between border-t border-slate-500 border-opacity-30">
                <Link href={`/item/${item.id}`} passHref><p className="font-semibold my-2 line-clamp-2 text-md cursor-pointer">{item.name}</p></Link>
                <div>
                    <h3 className="font-semibold text-2xl">{ formatter(item.price) }</h3>
                    <button
                        className="bg-red-400 p-2 rounded font-semibold text-sm md:text-md mt-3 transition-colors hover:bg-red-500"
                        onClick={() => addItem(item, 1)}
                    >SUMAR AL CARRITO</button>
                </div>
            </div>
        </div>
    );

}