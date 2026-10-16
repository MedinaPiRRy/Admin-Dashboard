import Link from 'next/link';
import Image from 'next/image';
import Styles from '@/(ui)/dashboard/panels/panels.module.css';
import { getTeam } from '@/lib/data';
import { formatDate } from '@/lib/format';

const TeamsPage = async () => {
   const { admins, clients } = await getTeam();

   return (
      <div className={Styles.page}>
         <div className={Styles.grid}>
            <div className={Styles.panel}>
               <span className={Styles.label}>Administrators</span>
               <span className={Styles.metric}>{admins.length}</span>
            </div>
            <div className={Styles.panel}>
               <span className={Styles.label}>Clients</span>
               <span className={Styles.metric}>{clients}</span>
            </div>
         </div>
         <div className={Styles.panel}>
            <h2>Administrators</h2>
            <table className={Styles.table}>
               <thead>
                  <tr><td>Name</td><td>Email</td><td>Status</td><td>Member since</td></tr>
               </thead>
               <tbody>
                  {admins.length === 0 && <tr><td colSpan={4} className={Styles.empty}>No administrators found.</td></tr>}
                  {admins.map((admin) => (
                     <tr key={admin.id}>
                        <td>
                           <div className={Styles.person}>
                              <Image src={admin.img || "/no-avatar.jpg"} alt="" width={40} height={40} />
                              <Link href={`/dashboard/users/${admin.id}`}>{admin.username}</Link>
                           </div>
                        </td>
                        <td>{admin.email}</td>
                        <td>{admin.isActive ? "Active" : "Inactive"}</td>
                        <td>{formatDate(admin.createdAt)}</td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
   );
};

export default TeamsPage;
