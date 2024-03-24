import Styles from '@/(ui)/dashboard/products/singleProduct/singleProductPage.module.css';
import Image from 'next/image';

const SingleUserPage = () => {
   return (
      <div className={Styles.container}>
        <div className={Styles.infoContainer}>
            <div className={Styles.imgContainer}>
                <Image src='/no-product.jpg' alt='user image' fill />
            </div>
            <span>John Doe</span>
        </div>
        <div className={Styles.formContainer}>
            <form action="" className={Styles.form}>
                <label>Title</label>
                <input type="text" name='title' placeholder='Product' />
                <label>Price</label>
                <input type="number" name='price' placeholder='$19.99' />
                <label>Stock</label>
                <input type="number" name='stock' placeholder='99' />
                <label>Color</label>
                <input type="text" name='color' placeholder='White' />
                <label>Size</label>
                <input type="text" name='size' placeholder='L' />
                <label>Category</label>
                <select name="cat" id="cat">
                    <option value="kitchen">Kitchen</option>
                    <option value="computers">Computers</option>
                    <option value="phone">Phone</option>
                </select>
                <label>Description</label>
                <textarea name="desc" id="desc" rows="10" placeholder='description'></textarea>
                <button type='submit'><span>Update</span></button>
            </form>
        </div>
      </div>
   )
};

export default SingleUserPage;