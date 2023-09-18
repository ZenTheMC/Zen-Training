import React from "react";
import styles from "./MuscleGroupForm.module.css";

const MuscleGroupForm = ({ exercise, handleExerciseChange, exercises, attemptedSubmit }) => {
    const filteredExercises = exercises.filter(ex => ex.muscleGroup === exercise.muscleGroup);

    return (
        <div className={styles.MuscleGroupForm}>
            <label className={styles.MuscleGroupLabel}>
                Muscle group:
                <select
                    className={`${attemptedSubmit && !exercise.muscleGroup ? styles.InvalidInput : ''}`}
                    value={exercise.muscleGroup}
                    onChange={(event) => handleExerciseChange({ muscleGroup: event.target.value })}
                    required>
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
                <select
                    className={`${attemptedSubmit && !exercise.name ? styles.InvalidInput : ''}`}
                    value={exercise.name}
                    onChange={(event) => handleExerciseChange({ name: event.target.value })}
                    required>
                    <option value="">Select an exercise</option>
                    {filteredExercises.map(ex => (
                        <option key={ex.name} value={ex.name}>{ex.name}</option>
                    ))}
                </select>
            </label>
        </div>
    )
};

export default MuscleGroupForm;