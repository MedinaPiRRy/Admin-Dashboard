'use client'
import Styles from './pagination.module.css';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

const Pagination = ({count}) => {

   const searchParams = useSearchParams();
   const { replace } = useRouter();
   const pathName = usePathname();

   const page = searchParams.get("page") || "1";

   const params = new URLSearchParams(searchParams);
   const ITEM_PER_PAGE = 5;

   const hasPrev = ITEM_PER_PAGE * (parseInt(page) - 1) > 0;
   const hasNext = ITEM_PER_PAGE * (parseInt(page) - 1) + ITEM_PER_PAGE < count;

   const handleChangePage = (direction) => {
      direction === "prev" 
      ? params.set("page", parseInt(page) - 1) 
      : params.set("page", parseInt(page) + 1);
      replace(`${pathName}?${params.toString()}`);
   }

   return (
      <div className={Styles.container}>
        <button className={Styles.button} disabled={!hasPrev} onClick={()=>handleChangePage("prev")}>Previous</button>
        <button className={Styles.button} disabled={!hasNext} onClick={()=>handleChangePage("next")}>Next</button>
      </div>
   )
};

export default Pagination;