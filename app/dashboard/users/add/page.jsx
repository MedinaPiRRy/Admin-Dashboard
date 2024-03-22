import Styles from '@/(ui)/dashboard/users/add/add.module.css';

const AddUsersPage = () => {
   return (
      <div className={Styles.container}>
         <form action="" className={Styles.form}>
            <input type="text" placeholder='Username' name='username' required />
            <input type="text" placeholder='Title' name='title' required />
            <input type="email" placeholder='Email' name='email' required />
            <input type="password" placeholder='Password' name='password' required />
            <input type="number" placeholder='Phone Number' name='phone' required />
            <select name="isAdmin" id="isAdmin">
               <option value={false} selected>Is Admin?</option>
               <option value={true}>YES</option>
               <option value={false}>NO</option>
            </select>
            <select name="isActive" id="isActive">
               <option value={false} selected>Is Active?</option>
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