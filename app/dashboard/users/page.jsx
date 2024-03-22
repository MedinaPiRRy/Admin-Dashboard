import Search from '@/(ui)/dashboard/search/search';
import Styles from '@/(ui)/dashboard/users/users.module.css';
import Pagination from '@/(ui)/dashboard/pagination/pagination';
import Link from 'next/link';
import Image from 'next/image';

const UsersPage = () => {
   return (
      <div className={Styles.container}>
         <div className={Styles.top}>
            <Search placeholder="Search for an User" />
            <Link href="/dashboard/users/add">
               <button className={Styles.addButton}>Add New</button>
            </Link>
         </div>
            <table className={Styles.table}>
               <thead>
                  <tr>
                     <td>Username</td>
                     <td>Email</td>
                     <td>Created at</td>
                     <td>Role</td>
                     <td>Status</td>
                     <td>Actions</td>
                  </tr>
               </thead>
               <tbody>
                  <tr>
                     <td>
                        <div className={Styles.user}>
                           <Image src="/no-avatar.jpg" alt='user image' width={40} height={40} className={Styles.userImage} />
                           John Doe
                        </div>
                     </td>
                     <td>john.doe@gmail.com</td>
                     <td>13 January 2022</td>
                     <td>Admin</td>
                     <td>Active</td>
                     <td>
                        <div className={Styles.buttons}>
                           <Link href="/">
                              <button className={`${Styles.button} ${Styles.view}`}>View</button>
                           </Link>
                           <button className={`${Styles.button} ${Styles.delete}`}>Delete</button>
                        </div>
                     </td>
                  </tr>
               </tbody>
            </table>
            <Pagination />
      </div>
   )
};

export default UsersPage;