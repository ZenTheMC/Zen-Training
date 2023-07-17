import React, { useState } from "react";
import styles from "./SessionForm.module.css"

const SessionForm = ({ exerciseName, rirTarget }) => {
    const [sets, setSets] = useState([{ weight: "", reps: "" }]);
    const [error, setError] = useState("");

    const handleAddSet = () => {
        if (sets.length >= 7) {
            setError("No more sets for this exercise. Add another exercise for the same muscle.");
        } else {
            setSets([...sets, { weight: "", reps: "" }]);
            setError("");
        }
    };

    const handleRemoveSet = () => {
        if (sets.length <= 1) {
            setError("Each exercise must contain at least 1 set. Delete the exercise instead.");
        } else {
            setSets(sets.slice(0, -1));
            setError("");
        }
    };

    const handleWeightChange = (index, weight) => {
        const newSets = [...sets];
        newSets[index].weight = weight;
        setSets(newSets);
    };

    const handleRepsChange = (index, reps) => {
        const newSets = [...sets];
        newSets[index].reps = reps;
        setSets(newSets);
    };

    return (
        <div className={styles.SessionForm}>
            <h2 className={styles.ExerciseNameLabel}>
                {exerciseName}
            </h2>
            {sets.map((set, index) => (
                <div key={index}>
                    <label className={styles.SetsLabel}>
                        Set {index + 1}:
                    </label>
                    <label className={styles.WeightLabel}>
                        The weight used(lbs):
                        <input
                            type="number" min="0"
                            value={set.weight}
                            onChange={(event) => handleWeightChange(index, event.target.value)}
                            placeholder="#"
                            required
                        />
                    </label>
                    <label className={styles.RepsLabel}>
                        The repititions performed:
                        <input
                            type="number" min="0"
                            value={set.reps}
                            onChange={(event) => handleRepsChange(index, event.target.value)}
                            placeholder="#"
                            required
                        />
                    </label>
                </div>
            ))}
            <button type="button" onClick={handleAddSet}>Add Set</button>
            <button type="button" onClick={handleRemoveSet}>Remove Set</button>
            {error && <p>{error}</p>}
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