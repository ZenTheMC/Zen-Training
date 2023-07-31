import React, { useState } from "react";
import styles from "./MuscleGroupForm.module.css";

const MuscleGroupForm = ({ addExercise, exercises }) => {
    const [selectedMuscleGroup, setSelectedMuscleGroup] = useState("");
    const [selectedExerciseName, setSelectedExerciseName] = useState("");

    // Filter exercises based on the selected muscle group
    const filteredExercises = exercises.filter(exercise => exercise.muscleGroup === selectedMuscleGroup);

    const handleExerciseNameChange = (event) => {
        const selectedExercise = filteredExercises.find(exercise => exercise.name === event.target.value);
        setSelectedExerciseName(selectedExercise.name);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        addExercise(selectedMuscleGroup, selectedExerciseName);
        setSelectedMuscleGroup("");
        setSelectedExerciseName("");
    }
    
    return (
        <form className={styles.MuscleGroupForm} onSubmit={handleSubmit}>
            <label className={styles.MuscleGroupLabel}>
                Muscle group:
                <select
                    value={selectedMuscleGroup}
                    onChange={(event) => setSelectedMuscleGroup(event.target.value)} required>
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
                    value={selectedExerciseName}
                    onChange={handleExerciseNameChange} required>
                    <option value="">Select an exercise</option>
                    {filteredExercises.map(exercise => (
                        <option key={exercise.name} value={exercise.name}>{exercise.name}</option>
                    ))}
                </select>
            </label>
            <button type="submit">Add Exercise</button>
        </form>
    )
}

export default MuscleGroupForm;
