import React from 'react';
import Navbar from '../(ui)/dashboard/navbar/navbar';
import Sidebar from '../(ui)/dashboard/sidebar/sidebar';
import Styles from '../(ui)/dashboard/dashboard.module.css'

const Layout = ({ children }) => {
    return (
        <div className={Styles.container}>
            <div className={Styles.menu}>
                <Sidebar />
            </div>
            <div className={Styles.content}>
                <Navbar className={Styles.navbar} />
                {children}
            </div>
        </div>
    );
}

export default Layout;