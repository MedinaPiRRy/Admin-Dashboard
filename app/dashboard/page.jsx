import Card from "@/(ui)/dashboard/card/card";
import Styles from "../(ui)/dashboard/dashboard.module.css"
import RightBar from "@/(ui)/dashboard/rightbar/rightbar";
import Transaction from "@/(ui)/dashboard/transactions/transactions";
import Chart from "@/(ui)/dashboard/chart/chart";

const DashboardPage = () => {
  return (
    <div className={Styles.wrapper}>
      <div className={Styles.main}>
        <div className={Styles.cards}>
          <Card />
          <Card />
          <Card />
        </div>
          <Transaction />
          <Chart />
      </div>
      <div className={Styles.side}>
        <RightBar />
      </div>
    </div>
  );
}

export default DashboardPage;