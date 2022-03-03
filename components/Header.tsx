import { useAuthUser, withAuthUser } from 'next-firebase-auth';
import Link from 'next/link';
import { FaShoppingCart, FaWhatsapp, FaUser } from 'react-icons/fa';
import useCart from '../hooks/useCart';
import Button from './utils/Button';

function Header() {

    const { items } = useCart();
    const user = useAuthUser();
    
    return (
        <div className="bg-slate-300 p-4 rounded">
            <div className='flex flex-row justify-center items-center flex-wrap mb-4 md:max-w-[90%] m-auto'>
                <Link href="/" passHref>
                    <h1 className="font-bold text-2xl cursor-pointer select-none py-2">
                        ARNESES ELÉCTRICOS 
                    </h1>
                </Link>
            </div>
            <div className='flex justify-between'>
                <div className='flex items-center gap-2 font-semibold'>
                    <FaWhatsapp color='green'/>
                    <p>1167762422</p>
                </div>
                <div className='flex items-center gap-3'>
                {
                    !user.id ? (
                        <Link href='/login' passHref>
                            <Button>
                                <a className="flex items-center gap-3"><p className="hidden md:inline">INGRESA</p><FaUser/></a>
                            </Button>
                        </Link>
                    ) : (
                        <Button onClick={user.signOut}>
                            <div className="flex items-center gap-2">
                                <p className='font-semibold p-1 whitespace-nowrap hidden md:inline'>{user.displayName || user.email}</p>
                                <p className="inline md:hidden">{user.displayName ? user.displayName[0] : user.email![0] }</p>
                                <FaUser />
                            </div>
                        </Button>
                    )
                }
                <Link href='/cart' passHref>
                    <a className="relative p-2 rounded-full hover:bg-slate-200">
                        <div className='rounded-full bg-slate-500 text-center w-[17px] h-[17px] absolute bottom-0 left-0'><p className="text-xs font-semibold text-white">{items.length}</p></div>
                        <FaShoppingCart size={23}/>
                    </a>
                </Link>
                </div>
            </div>
        </div>
    );

}

export default withAuthUser()(Header);