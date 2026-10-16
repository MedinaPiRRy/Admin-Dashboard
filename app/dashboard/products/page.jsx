import { Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Styles from '@/(ui)/dashboard/products/products.module.css';
import Search from '@/(ui)/dashboard/search/search';
import Pagination from '@/(ui)/dashboard/pagination/pagination';
import Common from '@/(ui)/dashboard/common/common.module.css';
import Notice from '@/(ui)/dashboard/common/notice';
import EmptyRow from '@/(ui)/dashboard/common/emptyRow';
import DeleteButton from '@/(ui)/dashboard/common/deleteButton';
import { getProducts } from '@/lib/data';
import { deleteProduct } from '@/lib/actions';
import { formatCurrency, capitalize } from '@/lib/format';
import { LOW_STOCK_THRESHOLD } from '@/lib/constants';

// Loaded inside <Suspense> so the page shell renders immediately and the table shows a loading state
const ProductsTable = async ({ q, page }) => {
   const { products, count } = await getProducts(q, page);

   return (
      <>
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
      </>
   )
};

const ProductsPage = async (props) => {
   const searchParams = await props.searchParams;
   const q = searchParams?.q || "";
   const page = searchParams?.page || "1";

   return (
      <div className={Styles.container}>
         <Notice error={searchParams?.error} />
         <div className={Styles.top}>
            <Search placeholder="Search by product title" />
            <Link href="/dashboard/products/add">
               <button className={Styles.addButton}>Add New</button>
            </Link>
         </div>
         <Suspense key={`${q}|${page}`} fallback={<p className={Common.loading} role="status">Loading...</p>}>
            <ProductsTable q={q} page={page} />
         </Suspense>
      </div>
   )
};

export default ProductsPage;
