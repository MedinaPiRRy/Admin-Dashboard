import { MdAdsClick } from "react-icons/md";
import Styles from "./thirdCard.module.css";
import getData from "../script";

const ThirdCard = () => {

    const data = getData();
    const totalVisits = data.totalVisits;

    let percentage = Math.floor(Math.random() * 99) - 50;

    if (percentage === 0) {percentage = 5;}
    
    const percentageClassName = percentage >= 0 ? Styles.positive : Styles.negative;

   return (
      <div className={Styles.container}>
        <MdAdsClick size={24}/>
        <div className={Styles.texts}>
            <span className={Styles.title}>Total Visitors: </span>
            <span className={Styles.number}>{totalVisits}</span>
            <span className={Styles.detail}>
                <span className={percentageClassName}>{percentage}%</span> more than the previous week.!
            </span>
        </div>
      </div>
   )
};

export default ThirdCard;