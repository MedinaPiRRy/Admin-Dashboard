'use client'
import Styles from './NavBarSearch.module.css';
import { useState } from 'react';
import { MdSearch } from 'react-icons/md';
import { useRouter } from 'next/navigation';
import { menuItems } from '@/lib/menu';

const flatMenuItems = menuItems.flatMap((section) => section.list);

const NavBarSearch = ({placeholder}) => {

    const [searchTerm, setSearchTerm] = useState('');
    const { push } = useRouter();

    const term = searchTerm.trim().toLowerCase();
    const filteredMenuItems = term ? flatMenuItems.filter((item) => item.title.toLowerCase().includes(term)) : [];

    // Navigate to the selected path
    const handleSelect = (path) => {
        setSearchTerm('');
        push(path);
    };

   return (
    <div className={Styles.container}>
            <MdSearch size={20} />
            <input 
                type="text" 
                placeholder={placeholder} 
                className={Styles.input} 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && filteredMenuItems[0] && handleSelect(filteredMenuItems[0].path)}
            />
            {term && (
                <div className={Styles.suggestions}>
                    {filteredMenuItems.length === 0 && <div className={Styles.suggestionItem}>No pages found</div>}
                    {filteredMenuItems.map((item) => (
                    <div className={Styles.suggentionWrapper} key={item.path}>
                        <div className={Styles.suggentionIcon}>{item.icon}</div>
                        <div 
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
