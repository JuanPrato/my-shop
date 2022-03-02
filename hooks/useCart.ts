import { useContext } from "react";
import { CartContext, cartContext } from "../components/providers/CartProvider";

export default function useCart(): CartContext {

    return useContext(cartContext);

}