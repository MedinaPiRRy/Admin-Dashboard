import Link from 'next/link';
import Image from 'next/image';
import Styles from '@/(ui)/dashboard/products/products.module.css';
import Search from '@/(ui)/dashboard/search/search';
import Pagination from '@/(ui)/dashboard/pagination/pagination';
import { getProducts } from '@/lib/data';

const ProductsPage = async() => {

   const Products = await getProducts();

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
                     <td>Color</td>
                     <td>Price</td>
                     <td>Category</td>
                     <td>Stock</td>
                     <td>Actions</td>
                  </tr>
               </thead>
               <tbody>
                  {Products.map((product) => (
                     <tr key={product.id}>
                        <td>
                           <div className={Styles.product}>
                              <Image src={product.img || "/no-product.jpg"} alt='user image' width={40} height={40} className={Styles.productImage} />
                              {product.title}
                           </div>
                        </td>
                        <td>{product.color}</td>
                        <td>{product.price}</td>
                        <td>{product.category}</td>
                        <td>{product.stock}</td>
                        <td>
                           <div className={Styles.buttons}>
                              <Link href="/dashboard/products/test">
                                 <button className={`${Styles.button} ${Styles.view}`}>View</button>
                              </Link>
                              <button className={`${Styles.button} ${Styles.delete}`}>Delete</button>
                           </div>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
            <Pagination />
      </div>
   )
};

export default ProductsPage;