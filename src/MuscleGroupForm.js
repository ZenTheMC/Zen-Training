import React from "react";
import styles from "./MuscleGroupForm.module.css"

const MuscleGroupForm = ({ muscleGroup, setMuscleGroup, exerciseName, setExerciseName}) => {
    return (
        <div className={styles.MuscleGroupForm}>
            <label className={styles.MuscleGroupLabel}>
                Muscle group:
                <select
                    value={muscleGroup}
                    onChange={(event) => setMuscleGroup(event.target.value)} required>
                    <option value="">Select a muscle group</option>
                    <option value="Chest">Chest</option>
                    <option value="Back">Back</option>
                    <option value="Triceps">Triceps</option>
                    <option value="Biceps">Biceps</option>
                    <option value="Side Delts">Side Delts</option>
                    <option value="Rear Delts">Rear Delts</option>
                    <option value="Front Delts">Front Delts</option>
                    <option value="Quads">Quads</option>
                    <option value="Hamstrings">Hamstrings</option>
                    <option value="Glutes">Glutes</option>
                    <option value="Calves">Calves</option>
                    <option value="Traps">Traps</option>
                    <option value="Forearms">Forearms</option>
                    <option value="Abs">Abs</option>
                    <option value="Other">Other</option>
                </select>
            </label>
            <label className={styles.ExerciseNameLabel}>
                Exercise name:
                <input
                    type="text"
                    value={exerciseName}
                    onChange={(event) => setExerciseName(event.target.value)}
                    placeholder="Name (e.g., Bench Press)"
                    required
                />
            </label>
        </div>
    )
}

export default MuscleGroupForm;