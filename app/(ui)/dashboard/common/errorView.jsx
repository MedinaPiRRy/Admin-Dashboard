'use client'
import Styles from './common.module.css';

const ErrorView = ({ error, reset }) => {
   return (
      <div className={Styles.errorView} role="alert">
         <h2>Something went wrong</h2>
         <p>{process.env.NODE_ENV === 'development' ? error?.message : 'The page could not be loaded. Please try again.'}</p>
         <button onClick={reset}>Try again</button>
      </div>
   );
};

export default ErrorView;
