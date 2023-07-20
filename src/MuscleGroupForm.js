import React, { useEffect, useState } from "react";
import styles from "./MuscleGroupForm.module.css";
import { db } from './Firebase';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./Firebase";
import { collection, getDocs } from "firebase/firestore";

const MuscleGroupForm = ({ muscleGroup, setMuscleGroup, exerciseName, setExerciseName, addExercise, setExerciseType }) => {
    const [exercises, setExercises] = useState([]);
    const [user] = useAuthState(auth);
    const userId = user ? user.uid : null;

    useEffect(() => {
        // Fetch exercise options from Firestore when the component mounts
        const fetchExercises = async () => {
            const globalExercisesCollection = await getDocs(collection(db, 'globalExercises'));
            const globalExercises = globalExercisesCollection.docs.map(doc => ({
                name: doc.data().exerciseName,
                type: doc.data().exerciseType,
                muscleGroup: doc.data().muscleGroup
            }));

            let userExercises = [];
            if (userId) {
                const userExercisesCollection = await getDocs(collection(db, 'users', userId, 'exercises'));
                userExercises = userExercisesCollection.docs.map(doc => ({
                    name: doc.data().exerciseName,
                    type: doc.data().exerciseType,
                    muscleGroup: doc.data().muscleGroup
                }));
            }

            setExercises([...globalExercises, ...userExercises]);
        };

        fetchExercises();
    }, [userId]);

    // Filter exercises based on the selected muscle group
    const filteredExercises = exercises.filter(exercise => exercise.muscleGroup === muscleGroup);

    const handleExerciseNameChange = (event) => {
        const selectedExercise = filteredExercises.find(exercise => exercise.name === event.target.value);
        setExerciseName(selectedExercise.name);
        setExerciseType(selectedExercise.type);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        addExercise(muscleGroup, exerciseName);
        setMuscleGroup("");
        setExerciseName("");
    }
    
    return (
        <form className={styles.MuscleGroupForm} onSubmit={handleSubmit}>
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
                <select
                    value={exerciseName}
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