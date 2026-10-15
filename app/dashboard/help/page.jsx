import Link from 'next/link';
import Styles from '@/(ui)/dashboard/panels/panels.module.css';

const HelpPage = () => (
   <div className={Styles.page}>
      <div className={Styles.panel}>
         <h2>Using the dashboard</h2>
         <div className={Styles.list}>
            <div><strong><Link href="/dashboard"><u>Dashboard</u></Link></strong> - totals for users, revenue and products with week-over-week change, the latest transactions and a 7-day chart. Hover a card to flip it for more detail.</div>
            <div><strong><Link href="/dashboard/users"><u>Users</u></Link></strong> - search, page through, add, edit and delete users. Leave the password blank when editing to keep it.</div>
            <div><strong><Link href="/dashboard/products"><u>Products</u></Link></strong> - the same for products. Items under 20 units are flagged with a warning.</div>
            <div><strong><Link href="/dashboard/transactions"><u>Transactions</u></Link></strong> - all orders, searchable by customer and filterable by status.</div>
            <div><strong><Link href="/dashboard/revenue"><u>Revenue</u></Link></strong> - completed revenue per month.</div>
            <div><strong><Link href="/dashboard/reports"><u>Reports</u></Link></strong> - inventory by category, low-stock items and user breakdown.</div>
            <div><strong><Link href="/dashboard/teams"><u>Teams</u></Link></strong> - the administrators of this workspace.</div>
         </div>
      </div>
      <div className={Styles.panel}>
         <h2>Good to know</h2>
         <div className={Styles.list}>
            <ul>
               <li>The page search in the top bar jumps to any section.</li>
               <li>The shared <code>demo_recruiter</code> account is read-only so the demo always stays usable.</li>
               <li>Everything you add or change is stored in the database; the demo data can be reset with <code>npm run seed</code>.</li>
            </ul>
         </div>
      </div>
   </div>
);

export default HelpPage;
