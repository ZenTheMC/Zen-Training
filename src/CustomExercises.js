import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "./Firebase";
import { addDoc, collection } from "firebase/firestore";
import styles from "./CustomExercises.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from "@fortawesome/free-solid-svg-icons";

const CustomExercises = ({ onExerciseAdded, closeCustomExercise }) => {
    const [muscleGroup, setMuscleGroup] = useState('');
    const [exerciseName, setExerciseName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [user] = useAuthState(auth);

    const handleSubmit = async () => {
        if (muscleGroup && exerciseName && user) {
            await addDoc(collection(db, 'users', user.uid, 'exercises'), {
                muscleGroup,
                exerciseName
            });
            onExerciseAdded();
            setErrorMessage('');
        } else {
            setErrorMessage('Please fill in both fields before submitting.');
        }
    };

    return (
        <div className={styles.CustomExercisesBackdrop} onClick={closeCustomExercise}>
            <div className={styles.CustomExercises} onClick={(e) => e.stopPropagation()}>
                <label>
                    Muscle Group:
                    <select value={muscleGroup} onChange={(e) => setMuscleGroup(e.target.value)} required>
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
                <label>
                    Exercise Name:
                    <input 
                        type="text" 
                        value={exerciseName} 
                        onChange={(e) => setExerciseName(e.target.value)}
                        placeholder="Enter exercise name"
                    />
                </label>
                {errorMessage && <p className={styles.ErrorMessage}>{errorMessage}</p>}
                <button className={styles.Save} onClick={handleSubmit}><FontAwesomeIcon icon={faSave}/> Save Exercise</button>
                <button className={styles.Cancel} onClick={closeCustomExercise}>Close</button>
            </div>
        </div>
    );
};

export default CustomExercises;