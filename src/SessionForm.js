import React from "react";
import styles from "./SessionForm.module.css"

const SessionForm = ({ exerciseName, sets, setSets, reps, setReps, weight, setWeight, rirTarget, setRirTarget }) => {
    return (
        <div className={styles.SessionForm}>
            <h2 className={styles.ExerciseNameLabel}>
                {exerciseName}
            </h2>
            <label className={styles.SetsLabel}>
                Number of sets:
                <input
                    type="number" min="0"
                    value={sets}
                    onChange={(event) => setSets(event.target.value)}
                    placeholder="#"
                    required
                />
            </label>
            <label className={styles.WeightLabel}>
                The weight used(lbs):
                <input
                    type="number" min="0"
                    value={weight}
                    onChange={(event) => setWeight(event.target.value)}
                    placeholder="#"
                    required
                />
            </label>
            <label className={styles.RepsLabel}>
                The repititions performed:
                <input
                    type="number" min="0"
                    value={reps}
                    onChange={(event) => setReps(event.target.value)}
                    placeholder="#"
                    required
                />
            </label>
            <label className={styles.RirLabel}>
                Reps in reserve:
                <input
                    type="number" min="0"
                    value={rirTarget}
                    readOnly
                />
            </label>
        </div>
    )
}

export default SessionForm;