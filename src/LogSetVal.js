import React from 'react';
import styles from './LogSetVal.module.css';

const LogSetVal = ({ onClose }) => {
    return (
        <div className={styles.Overlay}>
            <div className={styles.Menu}>
                <p><strong>Weight and reps must be set before logging a set!</strong>!</p>
                <button className={styles.Button} onClick={onClose}>Okay</button>
            </div>
        </div>
    );
};

export default LogSetVal;