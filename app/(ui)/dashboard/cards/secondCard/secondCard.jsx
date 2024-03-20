import { MdAddShoppingCart } from "react-icons/md";
import Styles from "./secondCard.module.css";
import { returnedData } from "../script";

const SecondCard = () => {

    const sales = returnedData.totalSales;

    let percentage = Math.floor(Math.random() * 99) - 50;

    if (percentage === 0) {percentage = 5;}
    
    const percentageClassName = percentage >= 0 ? Styles.positive : Styles.negative;

    const moreThan = percentage >= 0 ? "more" : "less";

   return (
        <div className={Styles.container}>
            <div className={Styles.cardFront}>
            <div className={Styles.texts}>
                <div className={Styles.titleLine}>
                <MdAddShoppingCart size={24}/>
                <span className={Styles.title}>Total Purchases: </span>
                </div>
                <span className={Styles.number}>{sales}</span>
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

export default SecondCard;