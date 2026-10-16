'use client'
import { authenticate } from '@/lib/actions';
import Styles from './LoginForm.module.css';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';

const LoginButton = () => {
    const { pending } = useFormStatus();

    return (
        <button type="submit" disabled={pending}>
            <span>{pending ? 'Signing in...' : 'Login'}</span>
        </button>
    );
};

const LoginForm = () => {

    const [state, formAction] = useActionState(authenticate, undefined);
    const error = state ? { borderColor: 'red' } : {};

   return (
            <form action={formAction} className={Styles.form}>
                <h1>Login</h1>
                <div className={Styles.inputWrapper}>
                    <input
                        type="text"
                        id='username'
                        name='username'
                        autoComplete="username"
                        style={error}
                        required />
                    <label htmlFor="username" className={Styles.placeholder} >Username</label>
                </div>
                <div className={Styles.inputWrapper}>
                    <input
                        type="password"
                        id='password'
                        name='password'
                        autoComplete="current-password"
                        style={error}
                        required />
                    <label htmlFor="password" className={Styles.placeholder} >Password</label>
                </div>
                {state && <p className={Styles.error} role="alert">{state}</p>}
                <LoginButton />
                <p className={Styles.hint}>Demo account: <strong>demo_recruiter</strong> / <strong>Demo1234!</strong></p>
            </form>
   )
};

export default LoginForm;
