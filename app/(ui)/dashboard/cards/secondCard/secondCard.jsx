import { MdAddShoppingCart } from "react-icons/md";
import Styles from "./secondCard.module.css";
import getData from "../script";

const SecondCard = () => {

    const data = getData();
    const totalSales = data.totalSales;

    let percentage = Math.floor(Math.random() * 99) - 50;

    if (percentage === 0) {percentage = 5;}
    
    const percentageClassName = percentage >= 0 ? Styles.positive : Styles.negative;

   return (
      <div className={Styles.container}>
        <MdAddShoppingCart size={24}/>
        <div className={Styles.texts}>
            <span className={Styles.title}>Total Purchases: </span>
            <span className={Styles.number}>{totalSales}</span>
            <span className={Styles.detail}>
                <span className={percentageClassName}>{percentage}%</span> more than the previous week.!
            </span>
        </div>
      </div>
   )
};

export default SecondCard;