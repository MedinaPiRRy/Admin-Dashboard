"use client"
import Styles from './navbar.module.css';
import { usePathname } from 'next/navigation';
import {
    MdNotifications,
    MdOutlineChat,
    MdPublic,
    MdSearch,
  } from "react-icons/md";
import NavBarSearch from './navbarSearch/navbarSearch';

const Navbar = () => {

    const path = usePathname();
    const pathName = path.split("/").pop();

    return (
        <div className={Styles.container}>
            <div className={Styles.title}>{pathName}</div>
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