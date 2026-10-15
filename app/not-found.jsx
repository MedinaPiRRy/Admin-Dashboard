import Link from 'next/link';
import Styles from '@/(ui)/dashboard/common/common.module.css';

const NotFound = () => (
   <div className={Styles.errorView}>
      <h2>Page not found</h2>
      <p>The page or record you are looking for does not exist.</p>
      <Link href="/dashboard">Back to the dashboard</Link>
   </div>
);

export default NotFound;
