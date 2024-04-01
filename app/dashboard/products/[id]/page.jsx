import Styles from '@/(ui)/dashboard/products/singleProduct/singleProductPage.module.css';
import Image from 'next/image';
import { getProduct } from '@/lib/data';
import { updateProduct } from '@/lib/actions';

const SingleProductPage = async ({params}) => {

    const { id } = params;
    const product = await getProduct(id);

   return (
      <div className={Styles.container}>
        <div className={Styles.infoContainer}>
            <div className={Styles.imgContainer}>
                <Image src={product.img || "/no-avatar.jpg"} alt='user image' fill />
            </div>
            <span>{product.username}</span>
        </div>
        <div className={Styles.formContainer}>
            <form action={updateProduct} className={Styles.form}>
                <input type="text" hidden={true} value={product.id} name='id' />
                <label>Title</label>
                <input type="text" name='title' placeholder={product.title} />
                <label>Price</label>
                <input type="number" name='price' placeholder={product.price} />
                <label>Stock</label>
                <input type="number" name='stock' placeholder={product.stock} />
                <label>Color</label>
                <input type="text" name='color' placeholder={product.color} />
                <label>Size</label>
                <input type="text" name='size' placeholder={product.size} />
                <label>Category</label>
                <select name="cat" id="cat" required>
                    <option value={"none"}>{product.category.charAt(0).toUpperCase() + product.category.slice(1)}</option>
                    <option value="kitchen">Kitchen</option>
                    <option value="computers">Computers</option>
                    <option value="phone">Phone</option>
                </select>
                <label>Description</label>
                <textarea name="desc" id="desc" rows="10" placeholder={product.desc || "No Description"}></textarea>
                <button type='submit'><span>Update</span></button>
            </form>
        </div>
      </div>
   )
};

export default SingleProductPage;