import { MdAdsClick } from "react-icons/md";
import Styles from "./thirdCard.module.css";
import { returnedData } from "../../../../lib/cards";

const ThirdCard = () => {

    const visits = returnedData.totalVisits;

    let percentage = Math.floor(Math.random() * 99) - 50;

    if (percentage === 0) {percentage = 5;}
    
    const percentageClassName = percentage >= 0 ? Styles.positive : Styles.negative;

    const moreThan = percentage >= 0 ? "more" : "less";

   return (
    <div className={Styles.container}>
    <div className={Styles.cardFront}>
    <div className={Styles.texts}>
        <div className={Styles.titleLine}>
        <MdAdsClick size={24}/>
        <span className={Styles.title}>Total Visitors: </span>
        </div>
        <span className={Styles.number}>{visits}</span>
        <span className={Styles.detail}>
            <span className={percentageClassName}>{percentage}%</span> {moreThan} than the previous week.!
        </span>
    </div>
    </div>
    <div className={Styles.cardBack}>
    {/* Backside content goes here */}
    <div>More information...</div>
    </div>
</div>
   )
};

export default ThirdCard;