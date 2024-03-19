import { MdAdsClick } from "react-icons/md";
import Styles from "./thirdCard.module.css";
import { returnedData } from "../script";

const ThirdCard = () => {

    const visits = returnedData.totalVisits;

    let percentage = Math.floor(Math.random() * 99) - 50;

    if (percentage === 0) {percentage = 5;}
    
    const percentageClassName = percentage >= 0 ? Styles.positive : Styles.negative;

    const moreThan = percentage >= 0 ? "more" : "less";

   return (
      <div className={Styles.container}>
        <MdAdsClick size={24}/>
        <div className={Styles.texts}>
            <span className={Styles.title}>Total Visitors: </span>
            <span className={Styles.number}>{visits}</span>
            <span className={Styles.detail}>
                <span className={percentageClassName}>{percentage}%</span> {moreThan} than the previous week.!
            </span>
        </div>
      </div>
   )
};

export default ThirdCard;