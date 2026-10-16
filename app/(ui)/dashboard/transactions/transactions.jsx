import Styles from './transactions.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { formatCurrency, formatDate, capitalize } from '@/lib/format';

// Table of orders. Used on the dashboard (latest orders) and the Transactions page.
const Transaction = ({ orders = [], title = 'Latest Transactions', showViewAll = false }) => {
   return (
      <div className={Styles.container}>
         <h1 className={Styles.title}>{title}</h1>
         <table className={Styles.table}>
            <thead>
               <tr>
                  <td>Customer</td>
                  <td>Product</td>
                  <td>Status</td>
                  <td>Date</td>
                  <td>Amount</td>
               </tr>
            </thead>
            <tbody>
               {orders.length === 0 && (
                  <tr><td colSpan={5} className={Styles.empty}>No transactions found.</td></tr>
               )}
               {orders.map((order) => (
                  <tr className={Styles.userOption} key={order.id}>
                     <td>
                        <div className={Styles.user}>
                           <Image src="/no-avatar.jpg" alt="" width={40} height={40} className={Styles.userImage} />
                           {order.customer}
                        </div>
                     </td>
                     <td>{order.product}{order.quantity > 1 ? ` x${order.quantity}` : ''}</td>
                     <td>
                        <span className={`${Styles.status} ${Styles[order.status]}`}>{capitalize(order.status)}</span>
                     </td>
                     <td>{formatDate(order.createdAt)}</td>
                     <td>{formatCurrency(order.amount)}</td>
                  </tr>
               ))}
            </tbody>
         </table>
         {showViewAll && <Link href="/dashboard/transactions" className={Styles.viewAll}>View all transactions</Link>}
         <hr className={Styles.hr} />
      </div>
   )
};

export default Transaction;
