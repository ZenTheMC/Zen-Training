import React from "react";
import styles from "./MesoListModal.module.css";

const MesoListModal = ({ show, message, onConfirm, onCancel }) => {
    if (!show) return null;

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <h3>{message}</h3>
                <div className={styles.buttons}>
                    <button className={styles.confirm} onClick={onConfirm}>Confirm</button>
                    <button className={styles.cancel} onClick={onCancel}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default MesoListModal;