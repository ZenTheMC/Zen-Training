import React, { useEffect, useState } from "react";
import styles from "./ExerciseForm.module.css";
import { db } from './Firebase';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./Firebase";

const ExerciseForm = ({ exerciseName, exerciseType, setExerciseType, youtubeVideoId, setYoutubeVideoId }) => {
    const [exercises, setExercises] = useState([]);
    const [user] = useAuthState(auth);
    const userId = user ? user.uid : null;

    useEffect(() => {
        // Fetch exercise options from Firestore when the component mounts
        const fetchExercises = async () => {
            const globalExercisesCollection = await db.collection('globalExercises').get();
            const globalExercises = globalExercisesCollection.docs.map(doc => doc.data().exerciseName);

            let userExercises = [];
            if (userId) {
                const userExercisesCollection = await db.collection('users').doc(userId).collection('exercises').get();
                userExercises = userExercisesCollection.docs.map(doc => doc.data().exerciseName);
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
                        <option key={exercise} value={exercise}>{exercise}</option>
                    ))}
                </select>
            </label>
            <label className={styles.YoutubeVideoIdLabel}>
                Tutorial YT video (optional):
                <input
                    type="text"
                    value={youtubeVideoId}
                    onChange={(event) => setYoutubeVideoId(event.target.value)}
                    placeholder="url"
                />
            </label>
        </div>
    )
}

export default ExerciseForm;