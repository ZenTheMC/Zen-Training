import React from "react";
import styles from "./MesocycleForm.module.css";

const MesocycleForm = ({ mesoLength, setMesoLength, daysPerWeek, setDaysPerWeek }) => {
    return (
        <div className={styles.MesocycleForm}>
            <label className={styles.MesoLengthLabel}>
                How many weeks do you want your mesocycle to last?
                <select
                    value={mesoLength}
                    onChange={(event) => setMesoLength(event.target.value)} required>
                    <option value="">Select a meso length</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                </select>
            </label>
            <label className={styles.DaysPerWeekLabel}>
                How many days a week do you want to train?
                <select
                    value={daysPerWeek}
                    onChange={(event) => setDaysPerWeek(event.target.value)} required>
                    <option value="">Select training frequency</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                </select>
            </label>
        </div>
    )
}

export default MesocycleForm;