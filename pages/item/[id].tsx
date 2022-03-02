import { useMemo, useState } from "react";
import useProducts from "hooks/useProducts";
import Image from "next/image";
import { useRouter } from "next/router"
import useFormatter from "hooks/useFormatter";
import useCart from "hooks/useCart";
import { FaMinus, FaPlus } from "react-icons/fa";
import RoundButton from "components/utils/RoundButton";
import QuantitySelector from "components/utils/QuantitySelector";

export default function Product() {

    const [loading, setLoading ] = useState(false);
    const [value, setValue] = useState(1);

    const formatter = useFormatter();

    const { addItem } = useCart();

    const { id } = useRouter().query;

    const ps = useProducts();

    const product = useMemo(() => ps.find(p => p.id === id), [ps, id]);

    const subTotal = useMemo(() => value * (product?.price || 0), [product, value]);

    return (
        <div className="flex-grow items-center my-3 p-3 bg-slate-300 rounded">
            <div className="max-w-[80%] overflow-y-auto w-full h-full flex flex-col md:flex-row m-auto items-center gap-4 md:gap-12">
                <div className="h-full w-full relative min-h-[300px]">
                    {

                        <Image
                            src={product?.photoUrl || '/public/images/image_not_found.png'}
                            alt={`${product?.name} image`}
                            layout="fill"
                            className={`object-contain ${loading && 'hidden'}`}
                            onLoadingComplete={() => setLoading(false)}
                        />
                    }
                </div>
                <div className="md:w-[50%] border-t md:border-none border-slate-400">
                    <h1 className="my-3 font-semibold text-xl">{product?.name}</h1>
                    <div className='my-2'>
                        <h2 className="font-semibold text-lg">PRECIO POR UNIDAD: {formatter(product?.price || 0)}</h2>
                        <div>
                            <QuantitySelector value={value} setValue={setValue}/>
                            <button
                                className="bg-red-400 p-4 md:p-2 rounded font-semibold text-sm w-full md:w-auto md:text-md mt-3 transition-colors hover:bg-red-500 select-none"
                                onClick={() => product && addItem(product, value)}
                            >SUMAR AL CARRITO</button>
                        </div>
                    </div>
                    <h3 className="font-semibold">Descripción:</h3>
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eveniet aliquam voluptatum dignissimos voluptatem nisi ut placeat expedita maxime laborum, amet, pariatur nihil repellat fugiat possimus necessitatibus provident consectetur accusantium numquam.</p> 

                </div>
            </div>
        </div>
    )

}