import Styles from "./statCard.module.css";

// A dashboard card. Hovering flips it to show extra details on the back.
const StatCard = ({ icon, title, value, change, detail, back }) => {
  const hasChange = change !== null && change !== undefined;
  const changeClass = change >= 0 ? Styles.positive : Styles.negative;

  return (
    <div className={Styles.container}>
      <div className={Styles.cardFront}>
        <div className={Styles.texts}>
          <div className={Styles.titleLine}>
            {icon}
            <span className={Styles.title}>{title}</span>
          </div>
          <span className={Styles.number}>{value}</span>
          <span className={Styles.detail}>
            {hasChange ? (
              <>
                <span className={changeClass}>{change > 0 ? "+" : ""}{change}%</span> vs. the previous 7 days. {detail}
              </>
            ) : (
              detail
            )}
          </span>
        </div>
      </div>
      <div className={Styles.cardBack}>
        <div className={Styles.backList}>
          {back.map(([label, text]) => (
            <div key={label} className={Styles.backRow}>
              <span>{label}</span>
              <strong>{text}</strong>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
