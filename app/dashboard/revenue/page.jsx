import RevenueChart from '@/(ui)/dashboard/chart/revenueChart';
import Styles from '@/(ui)/dashboard/panels/panels.module.css';
import { getMonthlyRevenue, getRevenueSummary, getRevenueBreakdown } from '@/lib/data';
import { formatCurrency, formatNumber, percentChange, capitalize } from '@/lib/format';

const MONTHS = 12;

const RevenuePage = async () => {
   const [monthly, summary, breakdown] = await Promise.all([
      getMonthlyRevenue(MONTHS),
      getRevenueSummary(),
      getRevenueBreakdown(),
   ]);

   // Month-over-month change, except for the first month (nothing to compare with) and
   // the current month, which is only partly over and would always look like a drop.
   const rows = monthly
      .map((m, i) => ({
         ...m,
         partial: i === monthly.length - 1,
         change: i > 0 && i < monthly.length - 1 ? percentChange(m.revenue, monthly[i - 1].revenue) : null,
      }))
      .reverse();

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
                  <tr><td>Month</td><td>Completed orders</td><td>Revenue</td><td>vs. previous month</td></tr>
               </thead>
               <tbody>
                  {rows.map((m) => (
                     <tr key={m.name}>
                        <td>{m.name}{m.partial ? " (to date)" : ""}</td>
                        <td>{formatNumber(m.orders)}</td>
                        <td>{formatCurrency(m.revenue)}</td>
                        <td className={m.change === null ? undefined : m.change >= 0 ? Styles.up : Styles.down}>
                           {m.change === null ? "-" : `${m.change > 0 ? "+" : ""}${m.change}%`}
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
         <div className={Styles.grid2}>
            <div className={Styles.panel}>
               <h2>Top products by revenue</h2>
               <table className={Styles.table}>
                  <thead>
                     <tr><td>Product</td><td>Units</td><td>Revenue</td></tr>
                  </thead>
                  <tbody>
                     {breakdown.topProducts.length === 0 && <tr><td colSpan={3} className={Styles.empty}>No completed orders yet.</td></tr>}
                     {breakdown.topProducts.map((p) => (
                        <tr key={p.title}>
                           <td>{p.title}</td>
                           <td>{formatNumber(p.units)}</td>
                           <td>{formatCurrency(p.revenue)}</td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
            <div className={Styles.panel}>
               <h2>Revenue by category</h2>
               <table className={Styles.table}>
                  <thead>
                     <tr><td>Category</td><td>Revenue</td><td>Share</td></tr>
                  </thead>
                  <tbody>
                     {breakdown.categories.length === 0 && <tr><td colSpan={3} className={Styles.empty}>No completed orders yet.</td></tr>}
                     {breakdown.categories.map((c) => (
                        <tr key={c.category}>
                           <td>{capitalize(c.category)}</td>
                           <td>{formatCurrency(c.revenue)}</td>
                           <td>
                              <div className={Styles.bar}><span style={{ width: `${Math.round(c.share * 100)}%` }} /></div>
                              {Math.round(c.share * 100)}%
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </div>
      </div>
   );
};

export default RevenuePage;
