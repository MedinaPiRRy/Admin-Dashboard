'use client'
import { useFormStatus } from 'react-dom';
import Styles from './common.module.css';

// Submit button that shows a pending state while the server action runs.
const SubmitButton = ({ children, pendingText = 'Saving...' }) => {
   const { pending } = useFormStatus();

   return (
      <button type="submit" disabled={pending} className={Styles.submit}>
         <span>{pending ? pendingText : children}</span>
      </button>
   );
};

export default SubmitButton;
