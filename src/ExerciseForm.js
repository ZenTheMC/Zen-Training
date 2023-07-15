import React from "react";
import styles from "./ExerciseForm.module.css";

const ExerciseForm = ({ exerciseName, exerciseType, setExerciseType, youtubeVideoId, setYoutubeVideoId }) => {
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
                    <option value="Barbell">Barbell</option>
                    <option value="Dumbbell">Dumbbell</option>
                    <option value="Cable">Cable</option>
                    <option value="Machine">Machine</option>
                    <option value="Smith Machine">Smith Machine</option>
                    <option value="Bodyweight">Bodyweight</option>
                    <option value="Loaded Bodyweight">Loaded Bodyweight</option>
                    <option value="Other">Other</option>
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