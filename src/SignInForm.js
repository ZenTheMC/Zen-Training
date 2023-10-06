import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./Firebase";
import { Link } from "react-router-dom";
import styles from "./SignInForm.module.css"
import logo from "./Training-App-Logo2.jpg";

const SignInForm = ({ onLogoClick }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className={styles.container}>
            <h1>Welcome to Zen's Training App!</h1>
            <img
                src={logo}
                alt="Zen's Training App Logo"
                className={styles.Logo}
                onClick={onLogoClick}
            />
            <h2><em>Become the main character you were always meant to be!</em></h2>
            <form className={styles.form} onSubmit={handleSubmit}>
                <input
                    className={styles.input}
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                />
                <input
                    className={styles.input}
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                />
                <button className={styles.button} type="submit">Sign In</button>
                <Link className={styles.link} to="/signup">Create your account</Link>
                {error && <p>{error}</p>}
            </form>
        </div>
    );
};

export default SignInForm;