import React, { useEffect, useState } from "react";
import styles from "./ExerciseForm.module.css";
import { db } from './Firebase';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./Firebase";
import { collection, getDocs } from "firebase/firestore";

const ExerciseForm = ({ exerciseName, exerciseType, setExerciseType }) => {
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

    return (
        <div className={styles.ExerciseForm}>
            <h2 className={styles.ExerciseNameLabel}>
                {exerciseName}
            </h2>
            <label className={styles.ExerciseTypeLabel}>
                Exercise type:
                <select
                    value={exerciseType}
                    onChange={(event) => setExerciseType(event.target.value)} required>
                    <option value="">Select the type of exercise</option>
                    {exercises.map(exercise => (
                        <option key={exercise.name} value={exercise.type}>{exercise.name}</option>
                    ))}
                </select>
            </label>
        </div>
    )
}

export default ExerciseForm;