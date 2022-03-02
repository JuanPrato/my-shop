import { useEffect, useState } from 'react';
import Image from 'next/image';
import { FaTrash } from 'react-icons/fa';
import { CartItem } from 'shared/types/CartItem';
import useFormatter from '../hooks/useFormatter';
import { Item } from '../shared/types/Item';
import RoundButton from './utils/RoundButton';
import Link from 'next/link';
import QuantitySelector from './utils/QuantitySelector';

interface Props {
    item: CartItem;
    removeItem: (item: Item) => void;
    changeQuantity: (item: CartItem, newQuantity: number) => void;
}

export default function ItemCart({ item, removeItem, changeQuantity }: Props) {

    const formatter = useFormatter();
    const [value, setValue] = useState(item.quantity);

    useEffect(() => {
        changeQuantity(item, value);
    }, [value]);

    return (
        <div className="flex flex-col md:flex-row border rounded border-slate-400 p-3 my-2 h-[350px] md:h-[100px] items-center">
            <div className='relative h-full w-full md:w-[30%]'>
                <Image 
                    src={item.photoUrl}
                    alt="item product image"
                    className="h-full w-full object-contain"
                    layout="fill"
                />
            </div>
            <div className="flex flex-col md:flex-row items-center justify-between w-full pr-6">
                <Link href={`/item/${item.id}`} passHref><h2 className='font-semibold text-xl py-2 md:p-0 cursor-pointer'>{item.name}</h2></Link>
                <div className="flex flex-col md:flex-row gap-3 items-center">
                    <QuantitySelector value={value} setValue={setValue} />
                    <div className="flex items-center justify-evenly w-full">
                        <p className='text-lg font-semibold'>{formatter(item.quantity * item.price)}</p>
                        <RoundButton onClick={() => removeItem(item)}>
                            <div className="text-red-500 scale-125">
                                <FaTrash/>
                            </div>
                        </RoundButton>
                    </div>
                </div>
            </div>
        </div>
    );

}