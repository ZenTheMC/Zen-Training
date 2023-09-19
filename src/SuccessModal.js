import React from 'react';
import styles from './SuccessModal.module.css';
import { Link } from 'react-router-dom';

const SuccessModal = ({ show, onClose, children }) => {
    if (!show) return null;

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <h3>Account created successfully! You can now <Link to="/signin">sign in</Link></h3>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default SuccessModal;