import React from 'react';
import { Link } from "react-router-dom";
import styles from './PopUp.module.css';

const PopUp = ({ onClose }) => {
    return (
        <div className={styles.PopUpOverlay}>
            <div className={styles.PopUp}>
                <h2>No Incomplete Mesocycles</h2>
                <p>It seems you've completed all your mesocycles! Would you like to create a new one?</p>
                <div className={styles.ButtonContainer}>
                    <Link className={styles.Link} to="/newmeso">Create Mesocycle</Link>
                    <button className={styles.DismissButton} onClick={onClose}>Dismiss</button>
                </div>
            </div>
        </div>
    );
};

export default PopUp;