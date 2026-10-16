'use client'
import Styles from './pagination.module.css';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { ITEMS_PER_PAGE } from '@/lib/constants';

const Pagination = ({count}) => {

   const searchParams = useSearchParams();
   const { replace } = useRouter();
   const pathName = usePathname();

   const parsedPage = parseInt(searchParams.get("page"), 10);
   const page = Number.isNaN(parsedPage) || parsedPage < 1 ? 1 : parsedPage;
   const totalPages = Math.max(1, Math.ceil(count / ITEMS_PER_PAGE));

   const hasPrev = page > 1;
   const hasNext = page < totalPages;

   const handleChangePage = (direction) => {
      const params = new URLSearchParams(searchParams);
      params.delete('error');
      params.delete('success');
      params.set("page", direction === "prev" ? page - 1 : page + 1);
      replace(`${pathName}?${params.toString()}`);
   }

   return (
      <div className={Styles.container}>
        <button className={Styles.button} disabled={!hasPrev} onClick={()=>handleChangePage("prev")}>Previous</button>
        <span>Page {Math.min(page, totalPages)} of {totalPages}</span>
        <button className={Styles.button} disabled={!hasNext} onClick={()=>handleChangePage("next")}>Next</button>
      </div>
   )
};

export default Pagination;
