import Styles from '@/(ui)/dashboard/products/add/add.module.css';
import { createProduct } from '@/lib/actions';

const AddProductsPage = () => {
   return (
      <div className={Styles.container}>
         <form action={createProduct} className={Styles.form}>
            <input type="text" placeholder='Title' name='title' required />
            <select name="cat" id="cat">
               <option value="general">Choose a Category</option>
               <option value="kitchen">Kitchen</option>
               <option value="phone">Phone</option>
               <option value="computer">Computer</option>
            </select>
            <input type="number" placeholder='Price' name='price' step=".01" required />
            <input type="number" placeholder='Stock' name='stock' required />
            <input type="text" placeholder='Color' name='color' required />
            <input type="text" placeholder='Size' name='size' required />
            <textarea name="desc" id="desc" rows="10" placeholder='Description'></textarea>
            <button type='submit'><span>Submit</span></button>
         </form>
      </div>
   )
};

export default AddProductsPage;