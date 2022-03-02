import useSnack from "hooks/useSnack";
import { createContext, ReactNode, useState } from "react";
import { CartItem } from "shared/types/CartItem";
import { Item } from "../../shared/types/Item";

export type CartContext = {
    items: CartItem[];
    addItem: (item: Item, quantity: number) => void;
    removeItem: (item: Item) => void;
    updateQuantity: (cartItem: CartItem, quantity: number) => void;
}

export let cartContext = createContext<CartContext>({
    items: [],
    addItem: () => {},
    removeItem: () => {},
    updateQuantity: () => {}
});

export default function CartProvider ({ children }: {children: ReactNode}) {

    const [cart, setCart] = useState<CartItem[]>(() => {
        if (typeof window === "undefined") return [];
        const cartPrevItems = localStorage.getItem('cart');
        if (!cartPrevItems) return [];
        return JSON.parse(cartPrevItems);    
    });

    const { publishMessage } = useSnack();

    function addItem(item: Item, quantity: number) {

        const itemFound = cart.find((i: Item) => {
            return i.id === item.id;
        });

        if (itemFound) {
            publishMessage('Se actualizó la cantidad en el carrito', "warning");
            updateQuantity(item, itemFound.quantity + quantity);
            return;
        } else {
            const c = [...cart, {...item, quantity}];
            setCart(c);
            localStorage.setItem('cart', JSON.stringify(c));
        }
        publishMessage('Se agregó producto con éxito');
    }

    function updateQuantity(item: Item, quantity: number) {
        console.log('update');
        for (const cartItem of cart) {
            if (cartItem.id === item.id) {
                cartItem.quantity = quantity;
                return;
            }
        }
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    function removeItem(item: Item) {
        
        const newCart = cart.filter((i: Item) => {
            return i.id !== item.id;
        });
        setCart(newCart);
        localStorage.setItem('cart', JSON.stringify(newCart));

        publishMessage('Producto removido del carrito');
    }

    return (
        <cartContext.Provider value={{
            items: cart,
            addItem,
            removeItem,
            updateQuantity
        }}>
            {children}
        </cartContext.Provider>
    );


}