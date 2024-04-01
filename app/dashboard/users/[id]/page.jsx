import Styles from '@/(ui)/dashboard/users/singleUser/singleUserPage.module.css';
import Image from 'next/image';
import { getUser } from '@/lib/data';
import { updateUser } from '@/lib/actions';

const SingleUserPage = async ({params}) => {

    const { id } = params;
    const user = await getUser(id);

   return (
      <div className={Styles.container}>
        <div className={Styles.infoContainer}>
            <div className={Styles.imgContainer}>
                <Image src={user.img || "/no-avatar.jpg"} alt='user image' fill />
            </div>
            <span>{user.username}</span>
        </div>
        <div className={Styles.formContainer}>
            <form action={updateUser} className={Styles.form}>
                <input type="text" hidden={true} value={user.id} name='id' />
                <label>Username</label>
                <input type="text" name='username' placeholder={user.username} />
                <label>Email</label>
                <input type="email" name='email' placeholder={user.email} />
                <div className={Styles.passwordContainer}>
                    <label>Password</label><br />
                    <input type="password" name="password" placeholder="Password" />
                    <div className={Styles.retype}>
                        <label>Retype Password</label><br />
                        <input type="password" name="retype" placeholder="Retype password" />
                    </div>
                </div>
                <label>Phone</label>
                <input type="number" name='phone' placeholder={user.phone || "No Phone Number"} />
                <label>Address</label>
                <textarea type="text" name='address' placeholder={user.address || "No Address"} />
                <label>Is Admin?</label>
                <select name="isAdmin" id="isAdmin">
                    <option value={true} selected={user.isAdmin}>YES</option>
                    <option value={false} selected={!user.isAdmin}>NO</option>
                </select>
                <label>Is Active?</label>
                <select name="isActive" id="isActive">
                    <option value={true} selected={user.isActive}>YES</option>
                    <option value={false} selected={!user.isActive}>NO</option>
                </select>
                <button type='submit'><span>Update</span></button>
            </form>
        </div>
      </div>
   )
};

export default SingleUserPage;