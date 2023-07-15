import React, { useState } from "react";
import styles from "./WorkoutForm.module.css"

const WorkoutForm = () => {
    const [mesoLength, setMesoLength] = useState("");
    const [daysPerWeek, setDaysPerWeek] = useState("");
    const [dayOfWeek, setDayOfWeek] = useState("");
    const [muscleGroup, setMuscleGroup] = useState("");
    const [exerciseName, setExerciseName] = useState("");
    const [exerciseType, setExerciseType] = useState("");
    const [sets, setSets] = useState("");
    const [reps, setReps] = useState("");
    const [weight, setWeight] = useState("");
    const [rirTarget, setRirTarget] = useState("");
    const [youtubeVideoId, setYoutubeVideoId] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        // TODO : Submit the form data to Firebase

        // Clear the form fields
        setMesoLength("");
        setDaysPerWeek("");
        setDayOfWeek("");
        setMuscleGroup("");
        setExerciseName("");
        setExerciseType("");
        setSets("");
        setReps("");
        setWeight("");
        setRirTarget("");
        setYoutubeVideoId("");
    };

    return (
        <form className={styles.WorkoutForm} onSubmit={handleSubmit}>
            <label className={styles.labels}>
                How many weeks do you want your mesocycle to last?
                <select
                    value={mesoLength}
                    onChange={(event) => setMesoLength(event.target.value)} required>
                    <option value="">Select a meso length</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                </select>
            </label>
            <label className={styles.labels}>
                How many days a week do you want to train?
                <select
                    value={daysPerWeek}
                    onChange={(event) => setDaysPerWeek(event.target.value)} required>
                    <option value="">Select training frequency</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                </select>
            </label>
            <label className={styles.labels}>
                Day of the week:
                <select
                    value={dayOfWeek}
                    onChange={(event) => setDayOfWeek(event.target.value)} required>
                    <option value="">Select a day</option>
                    <option value="Monday">Monday</option>
                    <option value="Tuesday">Tuesday</option>
                    <option value="Wednesday">Wednesday</option>
                    <option value="Thursday">Thursday</option>
                    <option value="Friday">Friday</option>
                    <option value="Saturday">Saturday</option>
                    <option value="Sunday">Sunday</option>
                </select>
            </label>
            <label className={styles.labels}>
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
            <label className={styles.labels}>
                Exercise name:
                <input
                    type="text"
                    value={exerciseName}
                    onChange={(event) => setExerciseName(event.target.value)}
                    placeholder="Name (e.g., Bench Press)"
                    required
                />
            </label>
            <label className={styles.labels}>
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
            <label className={styles.labels}>
                Number of sets:
                <input
                    type="number" min="0"
                    value={sets}
                    onChange={(event) => setSets(event.target.value)}
                    placeholder="#"
                    required
                />
            </label>
            <label className={styles.labels}>
                The weight used(lbs):
                <input
                    type="number" min="0"
                    value={weight}
                    onChange={(event) => setWeight(event.target.value)}
                    placeholder="#"
                    required
                />
            </label>
            <label className={styles.labels}>
                The repititions performed:
                <input
                    type="number" min="0"
                    value={reps}
                    onChange={(event) => setReps(event.target.value)}
                    placeholder="#"
                    required
                />
            </label>
            <label className={styles.labels}>
                Reps in reserve:
                <input
                    type="number" min="0"
                    value={rirTarget}
                    onChange={(event) => setRirTarget(event.target.value)}
                    placeholder="#"
                    required
                />
            </label>
            <label className={styles.labels}>
                Tutorial YT video (optional):
                <input
                    type="text"
                    value={youtubeVideoId}
                    onChange={(event) => setYoutubeVideoId(event.target.value)}
                    placeholder="url"
                />
            </label>
            <button type="submit">Create Mesocycle</button>
        </form>
    );
}

export default WorkoutForm;