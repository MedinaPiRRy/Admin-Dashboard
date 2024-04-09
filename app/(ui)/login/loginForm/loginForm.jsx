'use client'
import { authenticate } from '@/lib/actions';
import Styles from './LoginForm.module.css';
import { useFormState } from 'react-dom';
import { useEffect, useState } from 'react';

const LoginForm = () => {

    const [state, formAction] = useFormState(authenticate, undefined);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [stopForm, setStopForm] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);
    const [hasInteracted, setHasInteracted] = useState(false); 

    const error = state ? { borderColor: 'red' } : {};

    useEffect(() => {
        if (hasInteracted) {
            validateForm();
        }
        setStopForm({"animation-play-state": "running"});
    }, [username, password, hasInteracted]);

    const validateForm = () => {
        let errors = {};
        if (!state) { 
            if (username === '') {
                errors.username = 'Username is required';
            } else if (password === '') {
                errors.password = 'Password is required';
            }
        }

        if (errors.username) {
            delete errors.password;
        }

        setErrors(errors);
        setIsFormValid(Object.keys(errors).length === 0); 
    }

    const handleFocus = () => {
        if (!hasInteracted) {
            setHasInteracted(true);
        }
        if (state) {
            validateForm();
        }
    };

    const sendForm = (e) => {
        if (isFormValid) {
            setStopForm({"animation-play-state": "paused"})
        }
    }


   return (
            <form action={formAction} className={Styles.form} style={stopForm} >
                <h1>Login</h1>
                <div className={Styles.inputWrapper}>
                    <input 
                        type="text" 
                        id='username' 
                        name='username' 
                        value={username} 
                        style={error} 
                        onChange={(e) => {setUsername(e.target.value)}}
                        onFocus={handleFocus} 
                        required />
                    <label htmlFor="username" className={Styles.placeholder} >Username</label>
                </div>
                {errors.username && errors.username}
                <div className={Styles.inputWrapper}>
                    <input 
                        type="password" 
                        id='password' 
                        name='password' 
                        value={password} 
                        style={error} 
                        onChange={(e) => {setPassword(e.target.value)}}
                        onFocus={handleFocus}
                        required />
                    <label htmlFor="password" className={Styles.placeholder} >Password</label>
                </div>
                {state && state}
                {errors.password && errors.password}
                <button 
                    type="submit" 
                    onClick={sendForm}
                    disabled={!isFormValid} 
                ><span>Login</span></button>
            </form>
   )
};

export default LoginForm;