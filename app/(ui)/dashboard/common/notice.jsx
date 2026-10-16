import Styles from './common.module.css';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '@/lib/constants';

// Renders the message for an ?error=... or ?success=... query parameter, if any.
const Notice = ({ error, success }) => {
   const message = error ? ERROR_MESSAGES[error] || ERROR_MESSAGES.failed : SUCCESS_MESSAGES[success];
   if (!message) return null;

   return (
      <div role={error ? 'alert' : 'status'} className={`${Styles.notice} ${error ? Styles.error : Styles.success}`}>
         {message}
      </div>
   );
};

export default Notice;
