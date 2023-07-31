import React, { useState, useEffect } from "react";
import DayColumn from "./DayColumn";
import SaveMeso from "./SaveMeso";
import styles from "./CreateMeso.module.css";
import { db } from "./Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./Firebase";
import { collection, getDocs } from "firebase/firestore";

const CreateMeso = () => {
    const [meso, setMeso] = useState({
        name: "",
        weeks: "",
        days: []
    });
    const [mesoName, setMesoName] = useState("");
    const [exercises, setExercises] = useState([]);
    const [user] = useAuthState(auth);
    const userId = user ? user.uid : null;
    
    useEffect(() => {
        // Fetch exercises from firebase
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

    const addDay = () => {
        setMeso(prevMeso => ({ 
            ...prevMeso, 
            days: [
                ...prevMeso.days, 
                { 
                    dayOfWeek: "", 
                    exercises: [{ muscleGroup: "", name: "" }] // add initial exercise
                }
            ] 
        }));
    };

    const deleteDay = (dayOfWeek) => {
        setMeso(prevMeso => ({ ...prevMeso, days: prevMeso.days.filter(day => day.dayOfWeek !== dayOfWeek) }));
    };

    const setMuscleGroup = (dayIndex, exerciseIndex, muscleGroup) => {
        setMeso(prevMeso => {
            const newDays = [...prevMeso.days];
            newDays[dayIndex].exercises[exerciseIndex].muscleGroup = muscleGroup;
            return { ...prevMeso, days: newDays };
        });
    };

    const setExerciseName = (dayIndex, exerciseIndex, exerciseName) => {
        setMeso(prevMeso => {
            const newDays = [...prevMeso.days];
            newDays[dayIndex].exercises[exerciseIndex].name = exerciseName;
            return { ...prevMeso, days: newDays };
        });
    };

    const addExercise = (dayIndex) => {
        setMeso(prevMeso => {
            const newDays = [...prevMeso.days];
            newDays[dayIndex].exercises.push({ muscleGroup: "", name: "" });
            return { ...prevMeso, days: newDays };
        });
    };

    const handleDayChange = (dayIndex, newdayOfWeek) => {
        setMeso(prevMeso => {
            const newDays = [...prevMeso.days];
            newDays[dayIndex].dayOfWeek = newdayOfWeek;
            return { ...prevMeso, days: newDays };
        });
    };  

    return (
        <div className={styles.CreateMeso}>
            <h1>Create A Mesocycle</h1>
            {meso.days.map((day, dayIndex) => (
                <DayColumn
                    key={dayIndex}
                    day={day}
                    dayIndex={dayIndex}
                    deleteDay={deleteDay}
                    handleDayChange={handleDayChange}
                    exercises={exercises}
                    setMuscleGroup={(exerciseIndex, muscleGroup) => setMuscleGroup(dayIndex, exerciseIndex, muscleGroup)}
                    setExerciseName={(exerciseIndex, exerciseName) => setExerciseName(dayIndex, exerciseIndex, exerciseName)}
                    addExercise={() => addExercise(dayIndex)}
                />
            ))}
            <button onClick={addDay}>+ Add Day</button>
            <SaveMeso
                meso={meso}
                setMeso={setMeso}
                mesoName={mesoName}
                setMesoName={setMesoName}
            />
        </div>
    );
};

export default CreateMeso;