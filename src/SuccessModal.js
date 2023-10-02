import React from 'react';
import styles from './SuccessModal.module.css';
import { Link } from 'react-router-dom';

const SuccessModal = ({ show, onClose, children, showLink = true }) => {
    if (!show) return null;

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                {children}
                {showLink && <h3>You can now <Link className={styles.link} to="/signin">sign in</Link></h3>}
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default SuccessModal;