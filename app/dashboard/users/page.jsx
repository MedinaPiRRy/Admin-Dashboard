import Search from '@/(ui)/dashboard/search/search';
import Styles from '@/(ui)/dashboard/users/users.module.css';
import Pagination from '@/(ui)/dashboard/pagination/pagination';
import Notice from '@/(ui)/dashboard/common/notice';
import EmptyRow from '@/(ui)/dashboard/common/emptyRow';
import DeleteButton from '@/(ui)/dashboard/common/deleteButton';
import Link from 'next/link';
import Image from 'next/image';
import { getUsers } from '@/lib/data';
import { deleteUser } from '@/lib/actions';
import { formatDate } from '@/lib/format';

const UsersPage = async (props) => {

   const searchParams = await props.searchParams;

   const q = searchParams?.q || "";
   const page = searchParams?.page || "1";
   const { users, count } = await getUsers(q, page);

   return (
      <div className={Styles.container}>
         <Notice error={searchParams?.error} />
         <div className={Styles.top}>
            <Search placeholder="Search by username or email" />
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
                  {users.length === 0 && (
                     <EmptyRow colSpan={6}>{q ? `No users match "${q}".` : "No users yet. Add the first one!"}</EmptyRow>
                  )}
                  {users.map((user) => (
                        <tr key={user.id}>
                        <td>
                           <div className={Styles.user}>
                              <Image src={user.img || "/no-avatar.jpg"} alt='' width={40} height={40} className={Styles.userImage} />
                              {user.username}
                           </div>
                        </td>
                        <td>{user.email}</td>
                        <td>{formatDate(user.createdAt)}</td>
                        <td>{user.isAdmin ? "Admin" : "Client"}</td>
                        <td>{user.isActive ? "Active" : "Inactive"}</td>
                        <td>
                           <div className={Styles.buttons}>
                              <Link href={`/dashboard/users/${user.id}`}>
                                 <button className={`${Styles.button} ${Styles.view}`}>View</button>
                              </Link>
                              <form action={deleteUser}>
                                 <input type="hidden" name='id' value={user.id} />
                                 <DeleteButton className={`${Styles.button} ${Styles.delete}`} label={user.username} />
                              </form>
                           </div>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
            <Pagination count={count} />
      </div>
   )
};

export default UsersPage;
