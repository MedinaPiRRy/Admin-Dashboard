import Image from 'next/image';
import Link from 'next/link';
import Styles from '@/(ui)/dashboard/panels/panels.module.css';
import { auth } from '@/../auth.js';
import { connectToDB } from '@/lib/utils';
import { User } from '@/lib/models';
import { formatDate } from '@/lib/format';

const SettingsPage = async () => {
   const session = await auth();
   await connectToDB();
   const user = await User.findOne({ username: session?.user?.username }, '-password').lean();

   return (
      <div className={Styles.page}>
         <div className={Styles.panel}>
            <h2>Your account</h2>
            {user ? (
               <div className={Styles.list}>
                  <div className={Styles.person}>
                     <Image src={user.img || "/no-avatar.jpg"} alt="" width={64} height={64} />
                     <div>
                        <strong>{user.username}</strong>
                        <div>{user.isAdmin ? "Administrator" : "User"}</div>
                     </div>
                  </div>
                  <div><strong>Email:</strong> {user.email}</div>
                  <div><strong>Phone:</strong> {user.phone || "-"}</div>
                  <div><strong>Address:</strong> {user.address || "-"}</div>
                  <div><strong>Member since:</strong> {formatDate(user.createdAt)}</div>
                  <div>
                     To change these details, open your record in{" "}
                     <Link href={`/dashboard/users/${user._id}`}><u>Users</u></Link>.
                     (The shared demo account is read-only.)
                  </div>
               </div>
            ) : (
               <p className={Styles.empty}>Your account could not be found.</p>
            )}
         </div>
      </div>
   );
};

export default SettingsPage;
