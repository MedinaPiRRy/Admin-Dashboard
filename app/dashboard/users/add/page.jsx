import Styles from '@/(ui)/dashboard/users/add/add.module.css';
import Notice from '@/(ui)/dashboard/common/notice';
import SubmitButton from '@/(ui)/dashboard/common/submitButton';
import { createUser } from '@/lib/actions';

const AddUsersPage = async (props) => {
   const searchParams = await props.searchParams;
   const error = searchParams?.error;
   const invalid = (...codes) => (codes.includes(error) ? { borderColor: 'red' } : {});

   return (
      <div className={Styles.container}>
         <Notice error={error} />
         <form action={createUser} className={Styles.form}>
            <input type="text" placeholder='Username' name='username' required minLength={3} maxLength={30} style={invalid('duplicateUser')} />
            <input type="email" placeholder='Email' name='email' required style={invalid('duplicateUser')} />
            <input type="password" placeholder='Password (min. 8 characters)' name='password' required minLength={8} style={invalid('passwordMismatch', 'passwordShort')} />
            <input type="password" placeholder='Confirm Password' name='retype' required minLength={8} style={invalid('passwordMismatch')} />
            <input type="tel" placeholder='Phone Number (10-15 digits)' name='phone' inputMode="tel" pattern="[0-9]{10,15}" title="10 to 15 digits" />
            <select name="isAdmin" defaultValue="false" aria-label="Role">
               <option value="false">Role: Client</option>
               <option value="true">Role: Admin</option>
            </select>
            <select name="isActive" defaultValue="true" aria-label="Status">
               <option value="true">Status: Active</option>
               <option value="false">Status: Inactive</option>
            </select>
            <input type="text" placeholder='Address' name='address' maxLength={200} />
            <SubmitButton>Submit</SubmitButton>
         </form>
      </div>
   )
};

export default AddUsersPage;
