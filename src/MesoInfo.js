import React from "react";
import styles from './MesoInfo.module.css'

const MesoInfo = ({ name, currentWeek, currentDay }) => {
    return (
        <div className={styles.MesoInfo}>
            <h1 className={styles.Name}>{name}</h1>
            <h2 className={styles.Week}>Week {currentWeek}</h2>
            <h3 className={styles.Day}>{currentDay}</h3>
        </div>
    );
};

export default MesoInfo;