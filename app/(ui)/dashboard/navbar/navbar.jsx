"use client"
import Styles from './navbar.module.css';
import { usePathname } from 'next/navigation';
import {
    MdNotifications,
    MdOutlineChat,
    MdPublic,
    MdSearch,
  } from "react-icons/md";

const Navbar = () => {

    const path = usePathname();

    return (
        <div className={Styles.container}>
            <div className={Styles.title}>{path.split("/").pop()}</div>
            <div className={Styles.menu}>
                <div className={Styles.search}>
                    <MdSearch size={20} color="#fff" />
                    <input type="text" placeholder='Search...' className={Styles.input} />
                </div>
                <div className={Styles.icons}>
                    <MdOutlineChat size={40} color="#fff" className={Styles.icon} />
                    <MdNotifications size={40} color="#fff" className={Styles.icon} />
                    <MdPublic size={40} color="#fff" className={Styles.icon} />
                </div>
            </div>
        </div>
    );
}

export default Navbar;