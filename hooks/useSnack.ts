import { SnackContext, snackContext } from "components/providers/SnackProvider";
import { useContext } from "react";

export default function useCart(): SnackContext {

    return useContext(snackContext);

}