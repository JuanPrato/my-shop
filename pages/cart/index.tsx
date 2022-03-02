import { NextPage } from "next/types";
import Script from "next/script";
import { useEffect, useMemo, useState } from "react";
import ItemCart from "../../components/ItemCart";
import useCart from "../../hooks/useCart";
import { CartItem } from "shared/types/CartItem";
import Button from "components/utils/Button";
import Loading from "components/utils/Loading";
import useFormatter from "hooks/useFormatter";
import { AuthAction, withAuthUser, withAuthUserSSR } from "next-firebase-auth";

const Cart: NextPage = () => {

    const { items, removeItem, updateQuantity } = useCart();
    const [mercadopago, setMercadopago] = useState<any>();
    const [loading, setLoading] = useState(false);
    const formatter = useFormatter();

    async function generateInvoice(mercadopago: any) {

        setLoading(true);
        const {id} = await fetch('/api/create-invoice', {
            method: 'POST',
            body: JSON.stringify({items: items.map(v => ({id: v.id, quantity: v.quantity}))}),
        }).then(r => r.json());
        setLoading(false);
        mercadopago.checkout({
            preference: {
                id
            },
            autoOpen: true
        });

    }

    useEffect(() => {
        if ((window as any).MercadoPago && !mercadopago)
            setMercadopago(new (window as any).MercadoPago(process.env.NEXT_PUBLIC_ML_PUBLIC_KEY!, {
                locale: 'es-AR'
            }));
    }, []);

    // const total: number = useMemo<number>(() => items.reduce((a, i) => a + (i.price * i.quantity), 0), [items]);
    const total: number = items.reduce((a, i) => a + (i.price * i.quantity), 0);

    return (
        <>
            <Script
                src="https://sdk.mercadopago.com/js/v2"
                onLoad={() => {
                    setMercadopago(new (window as any).MercadoPago(process.env.NEXT_PUBLIC_ML_PUBLIC_KEY!, {
                        locale: 'es-AR'
                    }));
                }}
            />
            <div className="my-4 p-4 bg-slate-300 rounded flex-grow flex flex-col">
                {
                    !!items.length && <h2 className="font-bold text-2xl mb-4">CARRITO DE COMPRAS:</h2>
                }
                <div className="flex flex-col p-2">
                    {
                        items.length > 0 ? (
                            items.map(item => <ItemCart key={item.id} item={item} removeItem={removeItem} changeQuantity={updateQuantity}/>)
                        ) : (
                            <h2 className="font-bold text-2xl text-center">NO TIENES ITEMS EN TU CARRITO</h2>
                        )
                    }
                </div>
                {
                    !!items.length && (
                        <div className="flex">
                            <div className="w-full flex-grow rounded border border-slate-400 m-2 p-3 text-center flex justify-between">
                                <h2 className="font-semibold text-lg">TOTAL: </h2>
                                <h2 className="font-semibold text-lg">{formatter(total)}</h2>
                            </div>
                            <div className="cho-container grid place-content-center pr-2">
                                <Button onClick={() => generateInvoice(mercadopago)}>
                                    {
                                        loading ? (
                                            <div className="p-3"><Loading /></div>
                                        ) : (
                                            <button className="font-semibold py-2 whitespace-nowrap">CONTINUAR CON EL PAGO</button>
                                        )
                                    }
                                </Button>
                            </div>
                        </div>
                    )
                }
            </div>
        </>
    );

}

export default withAuthUser({
    whenUnauthedBeforeInit: AuthAction.REDIRECT_TO_LOGIN,
    whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN
})(Cart);

export const getServerSideProps = withAuthUserSSR()();