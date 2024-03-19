import { MdSupervisedUserCircle } from "react-icons/md";
import Styles from "./firstCard.module.css";
import getData from "../script";

const FirstCard = () => {

  const data = getData();
  const totalUsers = data.totalUsers;

  const percentage = Math.floor(Math.random() * 99) - 50;
  const percentageClassName = percentage >= 0 ? Styles.positive : Styles.negative;

   return (
      <div className={Styles.container}>
        <MdSupervisedUserCircle size={24}/>
        <div className={Styles.texts}>
            <span className={Styles.title}>Total Users: </span>
            <span className={Styles.number}>{totalUsers}</span>
            <span className={Styles.detail}>
                <span className={percentageClassName}>{percentage}%</span> more than the previous week.!
            </span>
        </div>
      </div>
   )
};

export default FirstCard;