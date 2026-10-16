"use client"
import Styles from './navbar.module.css';
import { usePathname } from 'next/navigation';
import NavBarSearch from './navbarSearch/navbarSearch';

const Navbar = () => {

    const path = usePathname();
    const segments = path.split("/").filter(Boolean);
    // /dashboard/users/add -> "users / add"; record ids (24-char hex) become "details"
    const title = segments
        .slice(1)
        .map((segment) => (/^[0-9a-f]{24}$/i.test(segment) ? "details" : segment))
        .join(" / ") || "dashboard";

    return (
        <div className={Styles.container}>
            <h1 className={Styles.title}>{title}</h1>
            <div className={Styles.menu}>
                <NavBarSearch placeholder={"Search for page"} />
            </div>
        </div>
    );
}

export default Navbar;
