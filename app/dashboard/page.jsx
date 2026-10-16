import { MdSupervisedUserCircle, MdAttachMoney, MdShoppingBag } from "react-icons/md";
import Styles from "../(ui)/dashboard/dashboard.module.css"
import StatCard from "@/(ui)/dashboard/cards/statCard";
import RightBar from "@/(ui)/dashboard/rightbar/rightbar";
import Transaction from "@/(ui)/dashboard/transactions/transactions";
import Chart from "@/(ui)/dashboard/chart/chart";
import ScrollButton from "@/(ui)/dashboard/scrollTopButton/scrollButton";
import { getDashboardStats, getDailyOrders, getLatestOrders } from "@/lib/data";
import { formatCurrency, formatNumber, percentChange } from "@/lib/format";
import { LOW_STOCK_THRESHOLD } from "@/lib/constants";

const DashboardPage = async () => {
  const [stats, daily, latestOrders] = await Promise.all([getDashboardStats(), getDailyOrders(7), getLatestOrders(5)]);
  const { users, products, revenue } = stats;

  return (
    <div className={Styles.wrapper}>
      <div className={Styles.main}>
        <div className={Styles.cards}>
          <StatCard
            icon={<MdSupervisedUserCircle size={24} />}
            title="Total Users"
            value={formatNumber(users.total)}
            change={percentChange(users.newThisWeek, users.newPrevWeek)}
            detail={`${users.newThisWeek} new this week.`}
            back={[
              ["Active", formatNumber(users.active)],
              ["Inactive", formatNumber(users.total - users.active)],
              ["New (7 days)", formatNumber(users.newThisWeek)],
            ]}
          />
          <StatCard
            icon={<MdAttachMoney size={24} />}
            title="Revenue"
            value={formatCurrency(revenue.total)}
            change={percentChange(revenue.thisWeek, revenue.prevWeek)}
            detail={`${formatCurrency(revenue.thisWeek)} this week.`}
            back={[
              ["Completed orders", formatNumber(revenue.completedOrders)],
              ["All orders", formatNumber(revenue.allOrders)],
              ["This week", formatCurrency(revenue.thisWeek)],
            ]}
          />
          <StatCard
            icon={<MdShoppingBag size={24} />}
            title="Products"
            value={formatNumber(products.total)}
            detail={`${products.lowStock} low on stock (under ${LOW_STOCK_THRESHOLD} units).`}
            back={[
              ["Units in stock", formatNumber(products.units)],
              ["Inventory value", formatCurrency(products.value)],
              ["Low stock", formatNumber(products.lowStock)],
            ]}
          />
        </div>
        <div>
          <Transaction orders={latestOrders} showViewAll />
          <Chart data={daily} />
          <ScrollButton />
        </div>
      </div>
      <div className={Styles.side}>
        <RightBar />
      </div>
    </div>
  );
}

export default DashboardPage;
