'use client'
import Styles from '@/(ui)/dashboard/users/add/add.module.css';
import { createUser } from '@/lib/actions';
import { useSearchParams } from 'next/navigation';

const AddUsersPage = () => {

   const searchParams = new URLSearchParams(useSearchParams());
   const error = searchParams.get('error') || {};

   // Define a style for the error state
   const errorStyleP = error === 'passwordMismatch' ? { borderColor: 'red' }: {};
   const errorStyleU = error === 'duplicateUser' ? { borderColor: 'red' }: {};

   if (error === 'passwordMismatch') {
      var isHidden = false;
      var errorMessage = 'Passwords do not match';
   } else {
      var isHidden = true;
   }
   if (error === 'duplicateUser') {
      var isHidden = false;
      var errorMessage = 'User already exists';
   } else {
      var isHidden = true;
   }

   return (
      <div className={Styles.container}>
            <h2 hidden={isHidden}>{errorMessage}</h2>
         <form action={createUser} className={Styles.form}>
            <input type="text" placeholder='Username' name='username' requireds style={errorStyleU} />
            <input type="email" placeholder='Email' name='email' required style={errorStyleU} />
               <input type="password" placeholder='Password' name='password' required style={errorStyleP} />
            <input type="password" placeholder='Confirm Password' name='retype' required style={errorStyleP} />
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