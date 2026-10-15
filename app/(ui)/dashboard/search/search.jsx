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
      params.delete('error');
      params.delete('success');

      const value = e.target.value.trim();
      if (value) {
         params.set('q', value);
      } else {
         params.delete('q');
      }
      replace(`${pathName}?${params.toString()}`);
   },300);
    
   return (
      <div className={Styles.container}>
        <MdSearch size={20} />
        <input
           type="text"
           placeholder={placeholder}
           className={Styles.input}
           defaultValue={searchParams.get('q') || ''}
           onChange={handleSearch}
        />
      </div>
   )
};

export default Search;
