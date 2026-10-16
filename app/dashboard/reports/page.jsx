import Link from 'next/link';
import Styles from '@/(ui)/dashboard/panels/panels.module.css';
import { getReportData } from '@/lib/data';
import { formatCurrency, formatNumber, capitalize } from '@/lib/format';
import { LOW_STOCK_THRESHOLD } from '@/lib/constants';

const ReportsPage = async () => {
   const { categories, lowStock, users } = await getReportData();

   return (
      <div className={Styles.page}>
         <div className={Styles.grid}>
            <div className={Styles.panel}>
               <span className={Styles.label}>Admins / Clients</span>
               <span className={Styles.metric}>{users.admins} / {users.clients}</span>
            </div>
            <div className={Styles.panel}>
               <span className={Styles.label}>Active / Inactive users</span>
               <span className={Styles.metric}>{users.active} / {users.inactive}</span>
            </div>
         </div>

         <div className={Styles.panel}>
            <h2>Inventory by category</h2>
            <table className={Styles.table}>
               <thead>
                  <tr><td>Category</td><td>Products</td><td>Units in stock</td><td>Inventory value</td></tr>
               </thead>
               <tbody>
                  {categories.length === 0 && <tr><td colSpan={4} className={Styles.empty}>No products yet.</td></tr>}
                  {categories.map((c) => (
                     <tr key={c.category}>
                        <td>{capitalize(c.category)}</td>
                        <td>{formatNumber(c.products)}</td>
                        <td>{formatNumber(c.units)}</td>
                        <td>{formatCurrency(c.value)}</td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>

         <div className={Styles.panel}>
            <h2>Low stock (under {LOW_STOCK_THRESHOLD} units)</h2>
            <table className={Styles.table}>
               <thead>
                  <tr><td>Product</td><td>Category</td><td>Stock</td></tr>
               </thead>
               <tbody>
                  {lowStock.length === 0 && <tr><td colSpan={3} className={Styles.empty}>Nothing is running low. 🎉</td></tr>}
                  {lowStock.map((p) => (
                     <tr key={p.id}>
                        <td><Link href={`/dashboard/products/${p.id}`} className={Styles.person}><u>{p.title}</u></Link></td>
                        <td>{capitalize(p.category)}</td>
                        <td>{p.stock}</td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
   );
};

export default ReportsPage;
