import Link from 'next/link';
import Image from 'next/image';
import Styles from '@/(ui)/dashboard/products/products.module.css';
import Search from '@/(ui)/dashboard/search/search';
import Pagination from '@/(ui)/dashboard/pagination/pagination';

const ProductsPage = () => {
   return (
      <div className={Styles.container}>
         <div className={Styles.top}>
            <Search placeholder="Search for an Product" />
            <Link href="/dashboard/products/add">
               <button className={Styles.addButton}>Add New</button>
            </Link>
         </div>
            <table className={Styles.table}>
               <thead>
                  <tr>
                     <td>Tittle</td>
                     <td>Description</td>
                     <td>Price</td>
                     <td>Created at</td>
                     <td>Stock</td>
                     <td>Actions</td>
                  </tr>
               </thead>
               <tbody>
                  <tr>
                     <td>
                        <div className={Styles.product}>
                           <Image src="/no-product.jpg" alt='user image' width={40} height={40} className={Styles.productImage} />
                           iPhone
                        </div>
                     </td>
                     <td>description</td>
                     <td>$999.99</td>
                     <td>13 January 2022</td>
                     <td>72</td>
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

export default ProductsPage;