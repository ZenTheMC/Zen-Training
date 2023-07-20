import React, { useEffect, useState } from "react";
import styles from "./ExerciseForm.module.css";
import { db } from './Firebase';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./Firebase";
import { collection, getDocs } from "firebase/firestore";

const ExerciseForm = ({ exerciseName, setExerciseName, muscleGroup }) => {
    const [exercises, setExercises] = useState([]);
    const [user] = useAuthState(auth);
    const userId = user ? user.uid : null;

    useEffect(() => {
        // Fetch exercise options from Firestore when the component mounts
        const fetchExercises = async () => {
            const globalExercisesCollection = await getDocs(collection(db, 'globalExercises'));
            const globalExercises = globalExercisesCollection.docs.map(doc => ({
                name: doc.data().exerciseName,
                muscleGroup: doc.data().muscleGroup
            }));

            let userExercises = [];
            if (userId) {
                const userExercisesCollection = await getDocs(collection(db, 'users', userId, 'exercises'));
                userExercises = userExercisesCollection.docs.map(doc => ({
                    name: doc.data().exerciseName,
                    muscleGroup: doc.data().muscleGroup
                }));
            }

            setExercises([...globalExercises, ...userExercises]);
        };

        fetchExercises();
    }, [userId]);

    // Filter exercises based on the selected muscle group
    const filteredExercises = exercises.filter(exercise => exercise.muscleGroup === muscleGroup);

    const handleExerciseChange = (event) => {
        const selectedExercise = filteredExercises.find(exercise => exercise.name === event.target.value);
        setExerciseName(selectedExercise.name);
    };

    return (
        <div className={styles.ExerciseForm}>
            <h2 className={styles.ExerciseNameLabel}>
                Exercise Name:
            </h2>
            <select value={exerciseName} onChange={handleExerciseChange}>
                <option value="">Select an exercise</option>
                {filteredExercises.map(exercise => (
                    <option key={exercise.name} value={exercise.name}>{exercise.name}</option>
                ))}
            </select>
        </div>
    )
}

export default ExerciseForm;