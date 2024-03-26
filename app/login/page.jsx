import Styles from '@/(ui)/login/login.module.css';

const LoginPage = () => {
    return (
        <div className={Styles.container}>
            <form action='' className={Styles.form}>
                <h1>Login</h1>
                <div className={Styles.inputWrapper}>
                    <input type="text" id='username' required />
                    <label htmlFor="username" className={Styles.placeholder}>Username</label>
                </div>
                <div className={Styles.inputWrapper}>
                    <input type="password" id='password' required />
                    <label htmlFor="password" className={Styles.placeholder}>Password</label>
                </div>
                <button type="submit"><span>Login</span></button>
            </form>
        </div>
    );
}

export default LoginPage;