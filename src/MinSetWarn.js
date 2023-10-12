import React from 'react';
import styles from './MinSetWarn.module.css';

const MinSetWarn = ({ onClose }) => {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h3>You cant remove a set!</h3>
        <p>Minimum of two sets per exercise!</p>
        <p>Log second set as:</p>
        <p><em>0 weight, 0 reps</em></p>
        <button onClick={onClose} className={styles.closeButton}>Got it</button>
      </div>
    </div>
  );
};
  
export default MinSetWarn;