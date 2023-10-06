import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./Firebase";
import { Link } from "react-router-dom";
import styles from "./SignUpForm.module.css";
import SuccessModal from "./SuccessModal";
import logo from "./Training-App-Logo.jpg";

const SignUpForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Check for valid email using regex
        if (!emailRegex.test(email)) {
            setModalMessage("Please enter a valid email address.");
            setShowModal(true);
            return;
        }

        try {
            await createUserWithEmailAndPassword(auth, email, password);
            setShowModal(true);
            setModalMessage("Successfully signed up! Welcome to the Hypertrophy App!");
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className={styles.container}>
            <h1>Welcome to Zen's Training App!</h1>
            <h3><em>Start your adventure!</em></h3>
            <img
                src={logo}
                alt="Zen's Training App Logo"
                className={styles.Logo}
            />
            <SuccessModal
                show={showModal}
                onClose={() => setShowModal(false)}
            >
                {modalMessage}
            </SuccessModal>
            <h2>Sign up now!</h2>
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