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
                    <MdOutlineChat size={20} color="#fff" />
                    <MdNotifications size={20} color="#fff" />
                    <MdPublic size={20} color="#fff" />
                </div>
            </div>
        </div>
    );
}

export default Navbar;