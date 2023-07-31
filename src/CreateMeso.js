import React, { useState, useEffect } from "react";
import DayColumn from "./DayColumn";
import SaveMeso from "./SaveMeso";
import styles from "./CreateMeso.module.css";
import { db } from "./Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./Firebase";
import { collection, getDocs } from "firebase/firestore";

const CreateMeso = () => {
    const [meso, setMeso] = useState({ days: [] });  // Updated here
    const [mesoName, setMesoName] = useState("");
    const [mesoWeeks, setMesoWeeks] = useState("");
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

    const handleMesoNameChange = (event) => {
        setMesoName(event.target.value);
    };

    const handleMesoWeeksChange = (event) => {
        setMesoWeeks(event.target.value);
    };

    const addDay = () => {
        setMeso(prevMeso => ({
            ...prevMeso,
            days: [...prevMeso.days, { dayOfWeek: "", exercises: [{ muscleGroup: "", name: "" }] }]
        }));
    };

    const handleDayChange = (dayIndex, value) => {
        const newDays = [...meso.days];
        newDays[dayIndex] = { ...newDays[dayIndex], ...value };
        setMeso({ ...meso, days: newDays });
    };

    const deleteDay = (dayIndex) => {
        setMeso(prevMeso => ({ ...prevMeso, days: prevMeso.days.filter((day, index) => index !== dayIndex) }));
    };

    return (
        <div className={styles.CreateMeso}>
            <h1>Create A Mesocycle</h1>
            <input type="text" name="name" value={mesoName} onChange={handleMesoNameChange} placeholder="Meso Name" required />
            <input type="number" name="weeks" value={mesoWeeks} onChange={handleMesoWeeksChange} placeholder="Meso Length (Weeks)" required />
            {meso.days.map((day, dayIndex) => (
                <DayColumn
                    key={dayIndex}
                    day={day}
                    dayIndex={dayIndex}
                    deleteDay={deleteDay}
                    handleDayChange={handleDayChange}
                    exercises={exercises}
                />
            ))}
            <button onClick={addDay}>+ Add Day</button>
            <SaveMeso 
                meso={meso} 
                setMeso={setMeso} 
                mesoName={mesoName} 
                setMesoName={setMesoName} 
                mesoWeeks={mesoWeeks} 
                setMesoWeeks={setMesoWeeks}
            />
        </div>
    );
};

export default CreateMeso;