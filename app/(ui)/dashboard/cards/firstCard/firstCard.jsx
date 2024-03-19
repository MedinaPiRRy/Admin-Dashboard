import { MdSupervisedUserCircle } from "react-icons/md";
import Styles from "./firstCard.module.css";
import { returnedData } from "../script";

const FirstCard = () => {

  const users = returnedData.totalUsers;

  let percentage = Math.floor(Math.random() * 99) - 50;

  if (percentage === 0) {percentage = 5;}

  const percentageClassName = percentage >= 0 ? Styles.positive : Styles.negative;

  const moreThan = percentage >= 0 ? "more" : "less";

   return (
      <div className={Styles.container}>
        <MdSupervisedUserCircle size={24}/>
        <div className={Styles.texts}>
            <span className={Styles.title}>Total Users: </span>
            <span className={Styles.number}>{users}</span>
            <span className={Styles.detail}>
                <span className={percentageClassName}>{percentage}%</span> {moreThan} than the previous week.!
            </span>
        </div>
      </div>
   )
};

export default FirstCard;