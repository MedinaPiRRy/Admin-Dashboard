import Link from 'next/link';
import Image from 'next/image';
import Styles from '@/(ui)/dashboard/products/products.module.css';
import Search from '@/(ui)/dashboard/search/search';
import Pagination from '@/(ui)/dashboard/pagination/pagination';
import Notice from '@/(ui)/dashboard/common/notice';
import EmptyRow from '@/(ui)/dashboard/common/emptyRow';
import DeleteButton from '@/(ui)/dashboard/common/deleteButton';
import { getProducts } from '@/lib/data';
import { deleteProduct } from '@/lib/actions';
import { formatCurrency, capitalize } from '@/lib/format';
import { LOW_STOCK_THRESHOLD } from '@/lib/constants';

const ProductsPage = async ({searchParams}) => {
   const q = searchParams?.q || "";
   const page = searchParams?.page || "1";
   const { products, count } = await getProducts(q, page);

   return (
      <div className={Styles.container}>
         <Notice error={searchParams?.error} />
         <div className={Styles.top}>
            <Search placeholder="Search by product title" />
            <Link href="/dashboard/products/add">
               <button className={Styles.addButton}>Add New</button>
            </Link>
         </div>
            <table className={Styles.table}>
               <thead>
                  <tr>
                     <td>Title</td>
                     <td>Color</td>
                     <td>Price</td>
                     <td>Category</td>
                     <td>Stock</td>
                     <td>Actions</td>
                  </tr>
               </thead>
               <tbody>
                  {products.length === 0 && (
                     <EmptyRow colSpan={6}>{q ? `No products match "${q}".` : "No products yet. Add the first one!"}</EmptyRow>
                  )}
                  {products.map((product) => (
                     <tr key={product.id}>
                        <td>
                           <div className={Styles.product}>
                              <Image src={product.img || "/no-product.jpg"} alt='' width={40} height={40} className={Styles.productImage} />
                              {product.title}
                           </div>
                        </td>
                        <td>{product.color || "-"}</td>
                        <td>{formatCurrency(product.price)}</td>
                        <td>{capitalize(product.category)}</td>
                        <td>
                           {product.stock}
                           {product.stock < LOW_STOCK_THRESHOLD && <span title="Low stock"> ⚠</span>}
                        </td>
                        <td>
                           <div className={Styles.buttons}>
                              <Link href={`/dashboard/products/${product.id}`}>
                                 <button className={`${Styles.button} ${Styles.view}`}>View</button>
                              </Link>
                              <form action={deleteProduct}>
                                 <input type="hidden" value={product.id} name="id" />
                                 <DeleteButton className={`${Styles.button} ${Styles.delete}`} label={product.title} />
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

export default ProductsPage;
