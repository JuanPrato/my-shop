import { scrollTo } from '../components/Layout';

export default function useScroll() {

    return (quantity: number) => {
        scrollTo(quantity);
    }

} 