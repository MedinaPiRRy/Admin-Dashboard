import { Suspense } from 'react';
import Link from 'next/link';
import Search from '@/(ui)/dashboard/search/search';
import Pagination from '@/(ui)/dashboard/pagination/pagination';
import Transaction from '@/(ui)/dashboard/transactions/transactions';
import Styles from '@/(ui)/dashboard/panels/panels.module.css';
import Common from '@/(ui)/dashboard/common/common.module.css';
import { getOrders } from '@/lib/data';
import { ORDER_STATUSES } from '@/lib/constants';
import { capitalize } from '@/lib/format';

// Loaded inside <Suspense> so the filters render immediately and the table shows a loading state
const OrdersTable = async ({ q, status, page }) => {
   const { orders, count } = await getOrders(q, status, page);

   return (
      <>
         <Transaction orders={orders} title={`Transactions (${count})`} />
         <Pagination count={count} />
      </>
   );
};

const TransactionsPage = async (props) => {
   const searchParams = await props.searchParams;
   const q = searchParams?.q || "";
   const status = ORDER_STATUSES.includes(searchParams?.status) ? searchParams.status : "";
   const page = searchParams?.page || "1";

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
         <Suspense key={`${q}|${status}|${page}`} fallback={<p className={Common.loading} role="status">Loading...</p>}>
            <OrdersTable q={q} status={status} page={page} />
         </Suspense>
      </div>
   );
};

export default TransactionsPage;
