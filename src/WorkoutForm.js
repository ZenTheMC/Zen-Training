import React, { useEffect, useState } from "react";
import styles from "./WorkoutForm.module.css"
import MesocycleForm from "./MesocycleForm";
import DayForm from "./DayForm";
import MuscleGroupForm from "./MuscleGroupForm";
import ExerciseForm from "./ExerciseForm";
import SessionForm from "./SessionForm";
import { addMesocycle } from "./FirebaseFunctions";

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
    const [currentWeek, setCurrentWeek] = useState(1);
    const [currentDay, setCurrentDay] = useState(1);

    useEffect(() => {
        // Calculate rirTarget based on currentWeek and mesoLength
        const calculateRirTarget = (currentWeek, mesoLength) => {
            if (currentWeek === mesoLength) {
                // Last week of meso, deload
                return 8;
            } else {
                // Other weeks of meso
                return mesoLength - currentWeek - 1;
            }
        }

        setRirTarget(calculateRirTarget(currentWeek, mesoLength));
    }, [currentWeek, mesoLength]);

    const handleWorkoutCompletion = () => {
        // Increment currentDay
        setCurrentDay(currentDay + 1);

        // If currentDay exceeds daysPerWeek, reset currentDay and increment currentWeek
        if (currentDay >= daysPerWeek) {
            setCurrentDay(1);
            setCurrentWeek(currentWeek + 1);
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        // Prepare the mesocycle data
        const mesocycle = {
            mesoLength,
            daysPerWeek,
            // add other properties that might need to be created/set during meso creation by user
        };

        // Submit meso data to Firebase
        addMesocycle(userId, mesocycle);

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
            <button type="button" onClick={handleWorkoutCompletion}>Complete Workout</button>
            <button type="submit">Create Mesocycle</button>
        </form>
    );
}

export default WorkoutForm;