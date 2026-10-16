import Styles from './common.module.css';

const EmptyRow = ({ colSpan, children }) => (
   <tr>
      <td colSpan={colSpan} className={Styles.empty}>{children}</td>
   </tr>
);

export default EmptyRow;
