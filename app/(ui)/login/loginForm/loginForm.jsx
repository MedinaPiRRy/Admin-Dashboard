'use client'
import { authenticate } from '@/lib/actions';
import Styles from './LoginForm.module.css';
import { useFormState } from 'react-dom';

const LoginForm = () => {

    const [state, formAction] = useFormState(authenticate, undefined);

    const handleLogin = async (formData) => {
        const data = await authenticate(formData);
        data.error && setError(data.error);
    }

   return (
            <form action={formAction} className={Styles.form}>
                <h1>Login</h1>
                <div className={Styles.inputWrapper}>
                    <input type="text" id='username' name='username' required />
                    <label htmlFor="username" className={Styles.placeholder}>Username</label>
                </div>
                <div className={Styles.inputWrapper}>
                    <input type="password" id='password' name='password' required />
                    <label htmlFor="password" className={Styles.placeholder}>Password</label>
                </div>
                {state && state}
                <button type="submit"><span>Login</span></button>
            </form>
   )
};

export default LoginForm;