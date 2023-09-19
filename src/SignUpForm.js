import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./Firebase";
import { Link } from "react-router-dom";
import styles from "./SignUpForm.module.css"
import SuccessModal from "./SuccessModal";

const SignUpForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            setShowModal(true);
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className={styles.container}>
            <SuccessModal
            show={showModal}
            onClose={() => setShowModal(false)}>
            </SuccessModal>
            <h1>Welcome to the Hypertrophy App!</h1>
            <p>This app is for anyone wanting to maximize their muscle building potential</p>
            <h2>Sign up Page</h2>
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
                <button className={styles.button} type="submit">Sign Up</button>
                <Link className={styles.link} to="/signin">Sign In with your account</Link>
                {error && <p>{error}</p>}
            </form>
        </div>
    );
};

export default SignUpForm;