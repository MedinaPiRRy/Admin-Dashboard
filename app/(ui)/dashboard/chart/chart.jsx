'use client'
import Styles from './chart.module.css';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Orders and completed revenue per day, built from the database (see getDailyOrders)
const Chart = ({ data = [] }) => {
   const hasData = data.some((day) => day.orders > 0);

   return (
      <div className={Styles.container}>
         <h2 className={Styles.title}>Orders and revenue - last 7 days</h2>
         {hasData ? (
            <ResponsiveContainer width="100%" height="90%">
               <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <XAxis dataKey="name" />
                  <YAxis yAxisId="orders" allowDecimals={false} />
                  <YAxis yAxisId="revenue" orientation="right" tickFormatter={(v) => `$${v}`} />
                  <Tooltip contentStyle={{background:"#151c2c", border:"none"}} formatter={(value, name) => (name === "Revenue" ? `$${value}` : value)} />
                  <Legend />
                  <Line yAxisId="orders" type="monotone" name="Orders" dataKey="orders" stroke="#8884d8" />
                  <Line yAxisId="revenue" type="monotone" name="Revenue" dataKey="revenue" stroke="#82ca9d" />
               </LineChart>
            </ResponsiveContainer>
         ) : (
            <p className={Styles.empty}>No orders in the last 7 days.</p>
         )}
      </div>
   )
};

export default Chart;
