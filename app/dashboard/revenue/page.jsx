import RevenueChart from '@/(ui)/dashboard/chart/revenueChart';
import Styles from '@/(ui)/dashboard/panels/panels.module.css';
import { getMonthlyRevenue, getRevenueSummary } from '@/lib/data';
import { formatCurrency, formatNumber } from '@/lib/format';

const RevenuePage = async () => {
   const [monthly, summary] = await Promise.all([getMonthlyRevenue(6), getRevenueSummary()]);

   return (
      <div className={Styles.page}>
         <div className={Styles.grid}>
            <div className={Styles.panel}>
               <span className={Styles.label}>Completed revenue</span>
               <span className={Styles.metric}>{formatCurrency(summary.completedRevenue)}</span>
            </div>
            <div className={Styles.panel}>
               <span className={Styles.label}>Completed orders</span>
               <span className={Styles.metric}>{formatNumber(summary.completedOrders)}</span>
            </div>
            <div className={Styles.panel}>
               <span className={Styles.label}>Average order value</span>
               <span className={Styles.metric}>{formatCurrency(summary.averageOrder)}</span>
            </div>
            <div className={Styles.panel}>
               <span className={Styles.label}>Pending (not yet counted)</span>
               <span className={Styles.metric}>{formatCurrency(summary.pendingRevenue)}</span>
            </div>
         </div>
         <RevenueChart data={monthly} />
         <div className={Styles.panel}>
            <h2>Monthly breakdown</h2>
            <table className={Styles.table}>
               <thead>
                  <tr><td>Month</td><td>Completed orders</td><td>Revenue</td></tr>
               </thead>
               <tbody>
                  {[...monthly].reverse().map((m) => (
                     <tr key={m.name}>
                        <td>{m.name}</td>
                        <td>{formatNumber(m.orders)}</td>
                        <td>{formatCurrency(m.revenue)}</td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
   );
};

export default RevenuePage;
