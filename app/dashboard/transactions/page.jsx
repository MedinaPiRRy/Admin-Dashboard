import Link from 'next/link';
import Search from '@/(ui)/dashboard/search/search';
import Pagination from '@/(ui)/dashboard/pagination/pagination';
import Transaction from '@/(ui)/dashboard/transactions/transactions';
import Styles from '@/(ui)/dashboard/panels/panels.module.css';
import { getOrders } from '@/lib/data';
import { ORDER_STATUSES } from '@/lib/constants';
import { capitalize } from '@/lib/format';

const TransactionsPage = async (props) => {
   const searchParams = await props.searchParams;
   const q = searchParams?.q || "";
   const status = ORDER_STATUSES.includes(searchParams?.status) ? searchParams.status : "";
   const page = searchParams?.page || "1";
   const { orders, count } = await getOrders(q, status, page);

   const filterHref = (value) => {
      const params = new URLSearchParams();
      if (q) params.set("q", q);
      if (value) params.set("status", value);
      const query = params.toString();
      return `/dashboard/transactions${query ? `?${query}` : ""}`;
   };

   return (
      <div className={Styles.page}>
         <div className={Styles.panel}>
            <Search placeholder="Search by customer name" />
            <div className={Styles.filters}>
               <Link href={filterHref("")} className={!status ? Styles.activeFilter : ""}>All</Link>
               {ORDER_STATUSES.map((s) => (
                  <Link key={s} href={filterHref(s)} className={status === s ? Styles.activeFilter : ""}>{capitalize(s)}</Link>
               ))}
            </div>
         </div>
         <Transaction orders={orders} title={`Transactions (${count})`} />
         <Pagination count={count} />
      </div>
   );
};

export default TransactionsPage;
