'use client'
import { MdSearch } from 'react-icons/md';
import Styles from './search.module.css';
import { useDebouncedCallback } from 'use-debounce';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

const Search = ({placeholder}) => {

   const searchParams = useSearchParams();
   const { replace } = useRouter();
   const pathName = usePathname();

   
   
   const handleSearch = useDebouncedCallback((e) => {
      const params = new URLSearchParams(searchParams);
      params.set('page', '1');
      
      if (e.target.value) {
         e.target.value.length > 2 && params.set('q', e.target.value);
      } else {
         params.delete('q');
      }
      replace(`${pathName}?${params.toString()}`);
   },300);
    
   return (
      <div className={Styles.container}>
        <MdSearch size={20} />
        <input type="text" placeholder={placeholder} className={Styles.input} onChange={handleSearch} />
      </div>
   )
};

export default Search;