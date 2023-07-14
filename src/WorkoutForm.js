import React, { useState } from "react";

const WorkoutForm = () => {
    const [workoutName, setWorkoutName] = useState("");
    const [exerciseType, setExerciseType] = useState("");
    const [muscleGroup, setMuscleGroup] = useState("");
    const [sets, setSets] = useState("");
    const [reps, setReps] = useState("");
    const [weight, setWeight] = useState("");
    const [rirTarget, setRirTarget] = useState("");
    const [youtubeVideoId, setYoutubeVideoId] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        // TODO : Submit the form data to Firebase
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Workout Name:
                <input
                    type="text"
                    value={workoutName}
                    onChange={(event) => setWorkoutName(event.target.value)}
                    required
                />
            </label>
            <button type="submit">Create Workout</button>
        </form>
    );
}

export default WorkoutForm;