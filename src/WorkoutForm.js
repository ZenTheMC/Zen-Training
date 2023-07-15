import React, { useState } from "react";
import styles from "./WorkoutForm.module.css"
import MesocycleForm from "./MesocycleForm";
import DayForm from "./DayForm";
import MuscleGroupForm from "./MuscleGroupForm";
import ExerciseForm from "./ExerciseForm";
import SessionForm from "./SessionForm";

const WorkoutForm = () => {
    const [mesoLength, setMesoLength] = useState("");
    const [daysPerWeek, setDaysPerWeek] = useState("");
    const [dayOfWeek, setDayOfWeek] = useState("");
    const [muscleGroup, setMuscleGroup] = useState("");
    const [exerciseName, setExerciseName] = useState("");
    const [exerciseType, setExerciseType] = useState("");
    const [sets, setSets] = useState("");
    const [weight, setWeight] = useState("");
    const [reps, setReps] = useState("");
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
            <MesocycleForm mesoLength={mesoLength} setMesoLength={setMesoLength} daysPerWeek={daysPerWeek} setDaysPerWeek={setDaysPerWeek} />
            <DayForm dayofWeek={dayOfWeek} setDayOfWeek={setDayOfWeek} />
            <MuscleGroupForm muscleGroup={muscleGroup} setMuscleGroup={setMuscleGroup} exerciseName={exerciseName} setExerciseName={setExerciseName} />
            <ExerciseForm exerciseName={exerciseName} exerciseType={exerciseType} setExerciseType={setExerciseType} youtubeVideoId={youtubeVideoId} setYoutubeVideoId={setYoutubeVideoId} />
            <SessionForm exerciseName={exerciseName} sets={sets} setSets={setSets} weight={weight} setWeight={setWeight} reps={reps} setReps={setReps} rirTarget={rirTarget} setRirTarget={setRirTarget} />
            <button type="submit">Create Mesocycle</button>
        </form>
    );
}

export default WorkoutForm;