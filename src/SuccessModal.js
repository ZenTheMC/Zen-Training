import React from 'react';
import styles from './SuccessModal.module.css';
import { Link } from 'react-router-dom';

const SuccessModal = ({ show, onClose, children, showLink = false }) => {
    if (!show) return null;

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                {children}
                {showLink && <h3>You can now <Link className={styles.link} to="/signin">sign in</Link></h3>}
                <button className={styles.Close} onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default SuccessModal;