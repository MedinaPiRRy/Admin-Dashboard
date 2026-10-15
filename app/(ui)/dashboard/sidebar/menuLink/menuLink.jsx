"use client";
import Link from 'next/link';
import Styles from './menuLink.module.css';
import { usePathname } from 'next/navigation';

const MenuLink = ({item}) => {

    const pathName = usePathname();
    // The dashboard home only matches exactly; other items also match their sub-pages
    const isActive = item.path === "/dashboard" ? pathName === item.path : pathName.startsWith(item.path);

   return (
      <Link href={item.path} className={`${Styles.container} ${isActive ? Styles.active : ""}`}>
        {item.icon}
        {item.title}
      </Link>
   )
};

export default MenuLink;
