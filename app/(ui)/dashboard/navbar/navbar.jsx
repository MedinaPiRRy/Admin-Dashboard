"use client"
import Styles from './navbar.module.css';
import { usePathname } from 'next/navigation';
import {
    MdNotifications,
    MdOutlineChat,
    MdPublic,
  } from "react-icons/md";
import NavBarSearch from './navbarSearch/navbarSearch';
import { useRouter } from 'next/navigation';

const Navbar = () => {

    const path = usePathname();
    const pathName = path.split("/").pop();

    const router = useRouter();
        
    const reRoute = () => {
        router.refresh();
    };
    
    return (
        <div className={Styles.container}>
            <button onClick={reRoute} className={Styles.title}>{pathName}</button>
            <div className={Styles.menu}>
                <NavBarSearch placeholder={"Search for page"} />
                <div className={Styles.icons}>
                    <MdOutlineChat size={50} color="#fff" className={Styles.icon} />
                    <MdNotifications size={50} color="#fff" className={Styles.icon} />
                    <MdPublic size={50} color="#fff" className={Styles.icon} />
                </div>
            </div>
        </div>
    );
}

export default Navbar;