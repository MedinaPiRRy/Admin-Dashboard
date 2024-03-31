import Styles from '@/(ui)/dashboard/users/add/add.module.css';
import { createUser } from '@/lib/actions';

const AddUsersPage = () => {

   return (
      <div className={Styles.container}>
         <form action={createUser} className={Styles.form}>
            <input type="text" placeholder='Username' name='username' required />
            <input type="email" placeholder='Email' name='email' required />
            <input type="password" placeholder='Password' name='password' required />
            <input type="password" placeholder='Confirm Password' name='retype' required />
            <input type="number" placeholder='Phone Number' name='phone' />
            <select name="isAdmin" id="isAdmin" required>
               <option value={false}>Is Admin?</option>
               <option value={true}>YES</option>
               <option value={false}>NO</option>
            </select>
            <select name="isActive" id="isActive" required>
               <option value={false}>Is Active?</option>
               <option value={true}>YES</option>
               <option value={false}>NO</option>
            </select>
            <input type="text" placeholder='Address' name='address' />
            <button type='submit'><span>Submit</span></button>
         </form>
      </div>
   )
};

export default AddUsersPage;