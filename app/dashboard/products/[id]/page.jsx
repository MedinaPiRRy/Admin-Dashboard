import Styles from '@/(ui)/dashboard/products/singleProduct/singleProductPage.module.css';
import Notice from '@/(ui)/dashboard/common/notice';
import SubmitButton from '@/(ui)/dashboard/common/submitButton';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getProduct } from '@/lib/data';
import { updateProduct } from '@/lib/actions';
import { PRODUCT_CATEGORIES } from '@/lib/constants';

const SingleProductPage = async (props) => {

    const [params, searchParams] = await Promise.all([props.params, props.searchParams]);
    const product = await getProduct(params.id);
    if (!product) notFound();

    // Keep an existing category selectable even if it isn't in the standard list
    const categories = PRODUCT_CATEGORIES.some((c) => c.value === product.category)
        ? PRODUCT_CATEGORIES
        : [...PRODUCT_CATEGORIES, { value: product.category, label: product.category }];

   return (
      <div className={Styles.container}>
        <div className={Styles.infoContainer}>
            <div className={Styles.imgContainer}>
                <Image src={product.img || "/no-product.jpg"} alt={product.title} fill />
            </div>
            <span>{product.title}</span>
        </div>
        <div className={Styles.formContainer}>
            <Notice error={searchParams?.error} success={searchParams?.success} />
            <form action={updateProduct} className={Styles.form}>
                <input type="hidden" value={product.id} name='id' />
                <label htmlFor="title">Title</label>
                <input type="text" id="title" name='title' defaultValue={product.title} required maxLength={60} />
                <label htmlFor="price">Price</label>
                <input type="number" id="price" name='price' defaultValue={product.price} step=".01" min="0" required />
                <label htmlFor="stock">Stock</label>
                <input type="number" id="stock" name='stock' defaultValue={product.stock} min="0" step="1" required />
                <label htmlFor="color">Color</label>
                <input type="text" id="color" name='color' defaultValue={product.color || ""} />
                <label htmlFor="size">Size</label>
                <input type="text" id="size" name='size' defaultValue={product.size || ""} />
                <label htmlFor="cat">Category</label>
                <select name="cat" id="cat" required defaultValue={product.category}>
                    {categories.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
                </select>
                <label htmlFor="desc">Description</label>
                <textarea name="desc" id="desc" rows="10" defaultValue={product.desc || ""} placeholder="No Description" maxLength={1000}></textarea>
                <SubmitButton>Update</SubmitButton>
            </form>
        </div>
      </div>
   )
};

export default SingleProductPage;
