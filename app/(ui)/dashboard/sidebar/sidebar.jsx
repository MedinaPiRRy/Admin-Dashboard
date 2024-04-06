import { auth, signOut } from '@/../auth.js';
import MenuLink from './menuLink/menuLink';
import Styles from './sidebar.module.css';
import Image from 'next/image';
import { 
    MdDashboard, 
    MdSupervisedUserCircle, 
    MdShoppingBag, 
    MdAttachMoney, 
    MdWork, 
    MdAnalytics, 
    MdPeople, 
    MdOutlineSettings, 
    MdHelpCenter, 
    MdLogout} from 'react-icons/md';

const menuItems = [
    {
      title: "Pages",
      list: [
        {
          title: "Dashboard",
          path: "/dashboard",
          icon: <MdDashboard />,
        },
        {
          title: "Users",
          path: "/dashboard/users",
          icon: <MdSupervisedUserCircle />,
        },
        {
          title: "Products",
          path: "/dashboard/products",
          icon: <MdShoppingBag />,
        },
        {
          title: "Transactions",
          path: "/dashboard/transactions",
          icon: <MdAttachMoney />,
        },
      ],
    },
    {
      title: "Analytics",
      list: [
        {
          title: "Revenue",
          path: "/dashboard/revenue",
          icon: <MdWork />,
        },
        {
          title: "Reports",
          path: "/dashboard/reports",
          icon: <MdAnalytics />,
        },
        {
          title: "Teams",
          path: "/dashboard/teams",
          icon: <MdPeople />,
        },
      ],
    },
    {
      title: "User",
      list: [
        {
          title: "Settings",
          path: "/dashboard/settings",
          icon: <MdOutlineSettings />,
        },
        {
          title: "Help",
          path: "/dashboard/help",
          icon: <MdHelpCenter />,
        },
      ],
    },
  ];

const Sidebar = async () => {

  const session = await auth();
  console.log(session);

    return (
        <div className={Styles.container}>
            <div className={Styles.user}>
                <Image className={Styles.userImg} src={session.user.img || "/no-avatar.jpg"} alt="" width="50" height="50"></Image>
                <div className={Styles.userDetails}>
                    <span className={Styles.userName}>{session.user.username}</span>
                    <span className={Styles.userTitle}>{session.user.isAdmin ? "Administrator" : "User"}</span>
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
              await signOut();
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