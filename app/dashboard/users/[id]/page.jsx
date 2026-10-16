import Styles from '@/(ui)/dashboard/users/singleUser/singleUserPage.module.css';
import Notice from '@/(ui)/dashboard/common/notice';
import SubmitButton from '@/(ui)/dashboard/common/submitButton';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getUser } from '@/lib/data';
import { updateUser } from '@/lib/actions';
import { PROTECTED_USERNAME } from '@/lib/constants';

const SingleUserPage = async (props) => {

    const [params, searchParams] = await Promise.all([props.params, props.searchParams]);
    const user = await getUser(params.id);
    if (!user) notFound();

    const isProtected = user.username === PROTECTED_USERNAME;

   return (
      <div className={Styles.container}>
        <div className={Styles.infoContainer}>
            <div className={Styles.imgContainer}>
                <Image src={user.img || "/no-avatar.jpg"} alt={user.username} fill />
            </div>
            <span>{user.username}</span>
        </div>
        <div className={Styles.formContainer}>
            <Notice error={searchParams?.error} success={searchParams?.success} />
            {isProtected && !searchParams?.error && <Notice error="protectedUser" />}
            <form action={updateUser} className={Styles.form}>
                <input type="hidden" value={user.id} name='id' />
                <label htmlFor="username">Username</label>
                <input type="text" id="username" name='username' defaultValue={user.username} required minLength={3} maxLength={30} />
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name='email' defaultValue={user.email} required />
                <div className={Styles.passwordContainer}>
                    <label htmlFor="password">New password (leave blank to keep the current one)</label><br />
                    <input type="password" id="password" name="password" placeholder="New password" minLength={8} autoComplete="new-password" />
                    <div className={Styles.retype}>
                        <label htmlFor="retype">Retype Password</label><br />
                        <input type="password" id="retype" name="retype" placeholder="Retype password" minLength={8} autoComplete="new-password" />
                    </div>
                </div>
                <label htmlFor="phone">Phone</label>
                <input type="tel" id="phone" name='phone' defaultValue={user.phone || ""} placeholder="No Phone Number" inputMode="tel" pattern="[0-9]{10,15}" title="10 to 15 digits" />
                <label htmlFor="address">Address</label>
                <textarea id="address" name='address' defaultValue={user.address || ""} placeholder="No Address" maxLength={200} />
                <label htmlFor="isAdmin">Is Admin?</label>
                <select name="isAdmin" id="isAdmin" defaultValue={String(!!user.isAdmin)}>
                    <option value="true">YES</option>
                    <option value="false">NO</option>
                </select>
                <label htmlFor="isActive">Is Active?</label>
                <select name="isActive" id="isActive" defaultValue={String(user.isActive !== false)}>
                    <option value="true">YES</option>
                    <option value="false">NO</option>
                </select>
                <SubmitButton>Update</SubmitButton>
            </form>
        </div>
      </div>
   )
};

export default SingleUserPage;
