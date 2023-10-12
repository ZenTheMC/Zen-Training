import React from 'react';
import styles from './LogSetVal.module.css';

const LogSetVal = ({ onClose }) => {
    return (
        <div className={styles.Overlay} onClick={onClose}>
            <div className={styles.Menu} onClick={(e) => e.stopPropagation()}>
                <p><strong>Weight and reps must be set before logging a set!</strong>!</p>
                <button className={styles.Button} onClick={onClose}>Okay</button>
            </div>
        </div>
    );
};

export default LogSetVal;