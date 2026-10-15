import { MdPlayCircleFilled } from 'react-icons/md';
import Link from 'next/link';
import Styles from './rightbar.module.css';
import Image from 'next/image';

const RightBar = () => {
   return (
      <div className={Styles.container}>
         <div className={Styles.item}>
            <div className={Styles.bgContainer}>
               <Image src="/astronaut.png" alt="" fill className={Styles.bg} />
            </div>
            <div className={Styles.text}>
                  <span className={Styles.notification}>👋 Getting started</span>
               <h3 className={Styles.title}>
                  New here? The help page walks through every section of the dashboard.
               </h3>
               <p className={Styles.desc}>
                  Add users and products, search and page through the lists, and watch the
                  numbers on this page update.
               </p>
               <Link href="/dashboard/help" className={Styles.button}>
                  <MdPlayCircleFilled />
                  Open help
               </Link>
            </div>
         </div>

         <div className={Styles.item}>
            <div className={Styles.text}>
                  <span className={Styles.notification}>📊 Analytics</span>
               <h3 className={Styles.title}>
                  See revenue by month, inventory value and low-stock items.
               </h3>
               <p className={Styles.desc}>
                  The Revenue and Reports pages are calculated live from the database.
               </p>
               <Link href="/dashboard/reports" className={Styles.button}>
                  <MdPlayCircleFilled />
                  View reports
               </Link>
            </div>
         </div>
      </div>
   )
};

export default RightBar;
