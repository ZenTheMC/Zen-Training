import React from "react";
import styles from "./CompletionModal.module.css";

const CompletionModal = ({ handleStay, handleMoveOn }) => {
    return (
        <div className={styles.CompletionModal}>
            <div className={styles.modalContent}>
                <h2 className={styles.modalTitle}>Congratulations!</h2>
                <p className={styles.modalMessage}>You've successfully completed this mesocycle!</p>
                <button className={styles.stayButton} onClick={handleStay}>Stay</button>
                <button className={styles.moveOnButton} onClick={handleMoveOn}>Move On</button>
            </div>
        </div>
    );
}

export default CompletionModal;