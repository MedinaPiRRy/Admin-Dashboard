'use client'
import Styles from './NavBarSearch.module.css';
import { useState, useMemo } from 'react';
import { MdSearch, MdDashboard, MdSupervisedUserCircle, MdShoppingBag, MdAttachMoney, MdWork, MdAnalytics, MdPeople, MdOutlineSettings, MdHelpCenter} from 'react-icons/md';
import { useDebouncedCallback } from 'use-debounce';
import { useRouter } from 'next/navigation';

const NavBarSearch = ({placeholder}) => {

    const [searchTerm, setSearchTerm] = useState('');
    const { push } = useRouter();

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

    const flatMenuItems = useMemo(() => menuItems.reduce((acc, section) => [...acc, ...section.list], []), []);

    const handleSearch = useDebouncedCallback((event) => {
        setSearchTerm(event.target.value.toLowerCase());
    }, 300);
   
   
    const filteredMenuItems = useMemo(() => flatMenuItems.filter(item => item.title.toLowerCase().includes(searchTerm)), [searchTerm, flatMenuItems]);

    // Navigate to the selected path
    const handleSelect = (path) => {
        push(path);
    };

   return (
    <div className={Styles.container}>
            <MdSearch size={20} />
            <input 
                type="text" 
                placeholder={placeholder} 
                className={Styles.input} 
                onChange={handleSearch} 
            />
            {searchTerm && (
                <div className={Styles.suggestions}>
                    {filteredMenuItems.map((item) => (
                        <div className={Styles.suggentionWrapper}>
                            <div className={Styles.suggentionIcon}>{item.icon}</div>
                            <div 
                                key={item.path} 
                                className={Styles.suggestionItem} 
                                onClick={() => handleSelect(item.path)}
                            >
                                {item.title}
                        </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
   )
};

export default NavBarSearch;