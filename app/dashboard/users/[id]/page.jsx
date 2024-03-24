import Styles from '@/(ui)/dashboard/users/singleUser/singleUserPage.module.css';
import Image from 'next/image';

const SingleUserPage = () => {
   return (
      <div className={Styles.container}>
        <div className={Styles.infoContainer}>
            <div className={Styles.imgContainer}>
                <Image src='/no-avatar.jpg' alt='user image' fill />
            </div>
            <span>John Doe</span>
        </div>
        <div className={Styles.formContainer}>
            <form action="" className={Styles.form}>
                <label>Username</label>
                <input type="text" name='username' placeholder='John Doe' />
                <label>Email</label>
                <input type="email" name='email' placeholder='John.Doe@gmail.com' />
                <label>Password</label>
                <input type="password" name='password' placeholder='************' />
                <label>Phone</label>
                <input type="number" name='Phone' placeholder='+1(654)852-3695' />
                <label>Address</label>
                <textarea type="text" name='address' placeholder='address' />
                <label>Is Admin?</label>
                <select name="isAdmin" id="isAdmin">
                    <option value={true}>YES</option>
                    <option value={false}>NO</option>
                </select>
                <label>Is Active?</label>
                <select name="isActive" id="isActive">
                    <option value={true}>YES</option>
                    <option value={false}>NO</option>
                </select>
                <button type='submit'><span>Update</span></button>
            </form>
        </div>
      </div>
   )
};

export default SingleUserPage;