import { MdPlayCircleFilled } from 'react-icons/md';
import Styles from './rightbar.module.css';
import Image from 'next/image';

const RightBar = () => {
   return (
      <div className={Styles.container}>
         <div className={Styles.item}>
            <div className={Styles.bgContainer}>
               <Image src="/astronaut.png" alt="space ship" fill className={Styles.bg} />
            </div>
            <div className={Styles.text}>
                  <span className={Styles.notification}>🔥 Available Now</span>
               <h3 className={Styles.title}>
                  How to use the new version of the admin dashboard?
               </h3>
                  <span className={Styles.subtitle}>Takes 4 minutes to learn</span>
               <p className={Styles.desc}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Reprehenderit eius libero perspiciatis recusandae possimus.
               </p>
               <button className={Styles.button}>
                  <MdPlayCircleFilled />
                  Watch
               </button>
            </div>
         </div>

         <div className={Styles.item}>
            <div className={Styles.text}>
                  <span className={Styles.notification}>🚀 Coming Soon</span>
               <h3 className={Styles.title}>
                  New server actions are available, partial pre-rendering is coming
                  up!
               </h3>
                  <span className={Styles.subtitle}>Takes 4 minutes to learn</span>
               <p className={Styles.desc}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Reprehenderit eius libero perspiciatis recusandae possimus.
               </p>
               <button className={Styles.button}>
                  <MdPlayCircleFilled />
                  Learn
               </button>
            </div>
         </div>
      </div>
   )
};

export default RightBar;