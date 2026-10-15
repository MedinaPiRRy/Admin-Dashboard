'use client'
import Styles from './chart.module.css';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

// Completed revenue per month (see getMonthlyRevenue)
const RevenueChart = ({ data = [] }) => {
   const hasData = data.some((month) => month.revenue > 0);

   return (
      <div className={Styles.container}>
         <h2 className={Styles.title}>Completed revenue - last 6 months</h2>
         {hasData ? (
            <ResponsiveContainer width="100%" height="90%">
               <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <XAxis dataKey="name" />
                  <YAxis tickFormatter={(v) => `$${v}`} />
                  <Tooltip cursor={{ fill: "rgba(255,255,255,0.05)" }} contentStyle={{background:"#151c2c", border:"none"}} formatter={(value) => [`$${value}`, "Revenue"]} />
                  <Bar dataKey="revenue" fill="#8884d8" radius={[4, 4, 0, 0]} />
               </BarChart>
            </ResponsiveContainer>
         ) : (
            <p className={Styles.empty}>No completed orders in this period.</p>
         )}
      </div>
   )
};

export default RevenueChart;
