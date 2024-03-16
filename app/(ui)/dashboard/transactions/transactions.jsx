import Styles from './transactions.module.css';
import Image from 'next/image';

const Transaction = () => {
   return (
      <div className={Styles.container}>
         <h1 className={Styles.title}>Latest Transactions</h1>
         <table className={Styles.table}>
            <thead>
               <tr>
                  <td>Name</td>
                  <td>Status</td>
                  <td>Date</td>
                  <td>Amount</td>
               </tr>
            </thead>
            <tbody>
               <tr className={Styles.userOption}>
                  <td>
                     <div className={Styles.user}>
                        <Image src="/no-avatar.jpg" alt="user avatar" width={40} height={40} className={Styles.userImage} />
                        John Doe
                     </div>
                  </td>
                  <td>
                     <span className={`${Styles.status} ${Styles.pending}`} >Pending</span>
                  </td>
                  <td>12th June 2021</td>
                  <td>$32.100</td>
               </tr>
               <tr className={Styles.userOption}>
                  <td>
                     <div className={Styles.user}>
                        <Image src="/no-avatar.jpg" alt="user avatar" width={40} height={40} className={Styles.userImage} />
                        John Doe
                     </div>
                  </td>
                  <td>
                     <span className={`${Styles.status} ${Styles.done}`} >Done</span>
                  </td>
                  <td>12th June 2021</td>
                  <td>$32.100</td>
               </tr>
               <tr className={Styles.userOption}>
                  <td>
                     <div className={Styles.user}>
                        <Image src="/no-avatar.jpg" alt="user avatar" width={40} height={40} className={Styles.userImage} />
                        John Doe
                     </div>
                  </td>
                  <td>
                     <span className={`${Styles.status} ${Styles.cancelled}`} >Cancelled</span>
                  </td>
                  <td>12th June 2021</td>
                  <td>$32.100</td>
               </tr>
               <tr className={Styles.userOption}>
                  <td>
                     <div className={Styles.user}>
                        <Image src="/no-avatar.jpg" alt="user avatar" width={40} height={40} className={Styles.userImage} />
                        John Doe
                     </div>
                  </td>
                  <td>
                     <span className={`${Styles.status} ${Styles.pending}`} >Pending</span>
                  </td>
                  <td>12th June 2021</td>
                  <td>$32.100</td>
               </tr>
            </tbody>
         </table>
      </div>
   )
};

export default Transaction;