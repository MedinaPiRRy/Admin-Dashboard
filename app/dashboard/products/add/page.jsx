import Styles from '@/(ui)/dashboard/products/add/add.module.css';
import Notice from '@/(ui)/dashboard/common/notice';
import SubmitButton from '@/(ui)/dashboard/common/submitButton';
import { createProduct } from '@/lib/actions';
import { PRODUCT_CATEGORIES } from '@/lib/constants';

const AddProductsPage = async (props) => {
   const searchParams = await props.searchParams;
   const error = searchParams?.error;
   const errorStyle = error === 'duplicateProduct' ? { borderColor: 'red' } : {};

   return (
      <div className={Styles.container}>
         <Notice error={error} />
         <form action={createProduct} className={Styles.form}>
            <input type="text" placeholder='Title' name='title' required maxLength={60} style={errorStyle} />
            <select name="cat" id="cat" required defaultValue="">
               <option value="" disabled>Choose a Category</option>
               {PRODUCT_CATEGORIES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
            </select>
            <input type="number" placeholder='Price' name='price' step=".01" min="0" required />
            <input type="number" placeholder='Stock' name='stock' min="0" step="1" required />
            <input type="text" placeholder='Color' name='color' required />
            <input type="text" placeholder='Size' name='size' required />
            <textarea name="desc" id="desc" rows="10" placeholder='Description' maxLength={1000}></textarea>
            <SubmitButton>Submit</SubmitButton>
         </form>
      </div>
   )
};

export default AddProductsPage;
