import Card from "@/(ui)/dashboard/cards/firstCard/firstCard";
import Styles from "../(ui)/dashboard/dashboard.module.css"
import RightBar from "@/(ui)/dashboard/rightbar/rightbar";
import Transaction from "@/(ui)/dashboard/transactions/transactions";
import Chart from "@/(ui)/dashboard/chart/chart";
import SecondCard from "@/(ui)/dashboard/cards/secondCard/secondCard";
import ThirdCard from "@/(ui)/dashboard/cards/thirdCard/thirdCard";

const DashboardPage = () => {
  return (
    <div className={Styles.wrapper}>
      <div className={Styles.main}>
        <div className={Styles.cards}>
          <Card />
          <SecondCard />
          <ThirdCard />
        </div>
        <div>
          <Transaction />
          <Chart />
        </div>
      </div>
      <div className={Styles.side}>
        <RightBar />
      </div>
    </div>
  );
}

export default DashboardPage;