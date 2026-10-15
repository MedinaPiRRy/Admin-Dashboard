import { auth, signOut } from '@/../auth.js';
import MenuLink from './menuLink/menuLink';
import Styles from './sidebar.module.css';
import Image from 'next/image';
import { MdLogout } from 'react-icons/md';
import { menuItems } from '@/lib/menu';

const Sidebar = async () => {

  const session = await auth();
  const user = session?.user;

    return (
        <div className={Styles.container}>
            <div className={Styles.user}>
                <Image className={Styles.userImg} src={user?.img || "/no-avatar.jpg"} alt="" width="50" height="50"></Image>
                <div className={Styles.userDetails}>
                    <span className={Styles.userName}>{user?.username}</span>
                    <span className={Styles.userTitle}>{user?.isAdmin ? "Administrator" : "User"}</span>
                </div>
            </div>
            <ul className={Styles.list}>
                {menuItems.map((cat) => 
                    <li key={cat.title}>
                        <span className={Styles.cat}>{cat.title}</span>
                        {cat.list.map((item) => 
                        <MenuLink item={item} key={item.title} />
                    )}
                    </li>
                
                )}
            </ul>
            <form action={async () => {
              'use server';
              await signOut({ redirectTo: '/login' });
            }}>
              <button className={Styles.logout}>
                <MdLogout size={20} color="#fff" />
                Logout
              </button>
            </form>
        </div>
    );
}

export default Sidebar;
