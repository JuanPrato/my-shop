import Snack from "components/utils/Snack";
import { createContext, ReactNode, useEffect, useState } from "react";

type SnackType = "success" | "error" | "warning";

export type SnackContext = {
    publishMessage: (message: string, type?: SnackType) => void;
}

export let snackContext = createContext<SnackContext>({
    publishMessage: () => {},
});

interface Props {
    children: ReactNode
}

function getColor(type: SnackType) {
    switch (type) {
        case "success":
            return 'bg-green-400';
        case "warning":
            return 'bg-yellow-400';
        case "error":
            return 'bg-red-400';
    }
}

export default function SnackProvider({ children }: Props) {

    const [snacks, setSnacks] = useState<{ id: number, message: string, type: SnackType, duration: number }[]>([]);

    function publishMessage(message: string, type: SnackType = "success", duration: number = 3000) {
        if (snacks.length >= 3) {
            snacks.shift();
        }
        const id = Math.random();
        setSnacks([...snacks, { id, message, type, duration }]);
    }

    function onExpire(id: number) {
        setSnacks(snacks.filter(s => s.id !== id));
    }

    return (
        <snackContext.Provider value={{
            publishMessage
        }}>
            {children}
            <div className="fixed bottom-0 z-20">
                {
                    snacks.map((s) => <Snack key={s.id} id={s.id} message={s.message} color={getColor(s.type)} onExpire={onExpire}/>)
                }
            </div>
        </snackContext.Provider>
    )

}