import React, { useEffect, useState } from "react";
import styles from "./WorkoutForm.module.css"
import MesocycleForm from "./MesocycleForm";
import DayForm from "./DayForm";
import MuscleGroupForm from "./MuscleGroupForm";
import ExerciseForm from "./ExerciseForm";
import SessionForm from "./SessionForm";
import { addMesocycle } from "./FirebaseFunctions";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./Firebase";
import { signOut } from "firebase/auth";

const WorkoutForm = () => {
    const [mesoLength, setMesoLength] = useState("");
    const [daysPerWeek, setDaysPerWeek] = useState("");
    const [dayOfWeek, setDayOfWeek] = useState("");
    const [muscleGroup, setMuscleGroup] = useState("");
    const [exerciseName, setExerciseName] = useState("");
    const [sets, setSets] = useState("");
    const [weight, setWeight] = useState("");
    const [reps, setReps] = useState("");
    const [rirTarget, setRirTarget] = useState("");
    const [currentWeek, setCurrentWeek] = useState(1);
    const [currentDay, setCurrentDay] = useState(1);
    const [days, setDays] = useState([]);
    const [user] = useAuthState(auth);
    const userId = user ? user.uid : null;
    const [exercises] = useState([]);

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

    const addExercise = (muscleGroup, exerciseName) => {
        setDays(prevDays => {
            // Find the current day in the days array
            const dayIndex = prevDays.findIndex(day => day.dayOfWeek === dayOfWeek);
            if (dayIndex === -1) {
                // If the current day is not in the days array, add it
                return [...prevDays, {
                    dayOfWeek,
                    muscleGroups: [{
                        muscleGroup,
                        exercises: [{
                            exerciseName,
                            sets: null,
                            reps: null,
                            weight: null,
                            rirTarget: null,
                        }]
                    }]
                }];
            } else {
                // If the current day is in the days array, update it
                const newDays = [...prevDays];
                const day = newDays[dayIndex];
                const muscleGroupIndex = day.muscleGroups.findIndex(mg => mg.muscleGroup === muscleGroup);
                if (muscleGroupIndex === -1) {
                    // If the muscle group is not in the muscleGroups array, add it
                    day.muscleGroups.push({
                        muscleGroup,
                        exercises: [{
                            exerciseName,
                            sets: null,
                            reps: null,
                            weight: null,
                            rirTarget: null,
                        }]
                    });
                } else {
                    // If the muscle group is in the muscleGroups array, update it
                    const exercise = {
                        exerciseName,
                        sets: null,
                        reps: null,
                        weight: null,
                        rirTarget: null,
                    };
                    day.muscleGroups[muscleGroupIndex].exercises.push(exercise);
                }
                return newDays;
            }
        });
    };
    
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
    
        if (userId === null) {
            alert("Please sign in to create a mesocycle.");
            return;
        }
    
        // Prepare the mesocycle data
        const mesocycle = {
            mesoLength,
            daysPerWeek,
            days: days.reduce((acc, day) => {
                acc[day.dayOfWeek] = {
                    muscleGroups: day.muscleGroups.reduce((acc, muscleGroup) => {
                        acc[muscleGroup.muscleGroup] = {
                            exercises: muscleGroup.exercises.reduce((acc, exercise) => {
                                acc[exercise.exerciseName] = {
                                    sets: exercise.sets,
                                    reps: exercise.reps,
                                    weight: exercise.weight,
                                    rirTarget: exercise.rirTarget,
                                };
                                return acc;
                            }, {})
                        };
                        return acc;
                    }, {})
                };
                return acc;
            }, {})
        };
    
        // Submit meso data to Firebase
        addMesocycle(userId, mesocycle);
    
        // Clear the form fields
        setMesoLength("");
        setDaysPerWeek("");
        setDayOfWeek("");
        setMuscleGroup("");
        setExerciseName("");
        setSets("");
        setReps("");
        setWeight("");
        setRirTarget("");
    };

    const handleSignOut = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error("Error signing out", error);
        }
    };

    return (
        <form className={styles.WorkoutForm} onSubmit={handleSubmit}>
            <MesocycleForm mesoLength={mesoLength} setMesoLength={setMesoLength} daysPerWeek={daysPerWeek} setDaysPerWeek={setDaysPerWeek} />
            <DayForm dayofWeek={dayOfWeek} setDayOfWeek={setDayOfWeek} />
            <MuscleGroupForm muscleGroup={muscleGroup} setMuscleGroup={setMuscleGroup} exerciseName={exerciseName} setExerciseName={setExerciseName} addExercise={addExercise} exercises={exercises} />
            <ExerciseForm exerciseName={exerciseName} muscleGroup={muscleGroup} />
            <SessionForm exerciseName={exerciseName} sets={sets} setSets={setSets} weight={weight} setWeight={setWeight} reps={reps} setReps={setReps} rirTarget={rirTarget} setRirTarget={setRirTarget} />
            <button type="button" onClick={handleWorkoutCompletion}>Complete Workout</button>
            <button type="submit">Create Mesocycle</button>
            <button type="button" onClick={handleSignOut}>Sign Out</button>
        </form>
    );
}

export default WorkoutForm;