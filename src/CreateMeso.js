import React, { useState } from "react";
import DayColumn from "./DayColumn";
import SaveMeso from "./SaveMeso";
import styles from "./CreateMeso.module.css"

const CreateMeso = () => {
    const [meso, setMeso] = useState({
        name: "",
        weeks: "",
        days: [] // This will be an array of Day objects. Each Day object will include the day of the week and an array of Exercises.
    });
    const [mesoName, setMesoName] = useState("");

    const addDay = () => {
        setMeso(prevMeso => ({ ...prevMeso, days: [...prevMeso.days, { dayOfWeek: "", exercises: [] }] }));
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

    // TODO: Implement function to save/create the meso

    return (
        <div className={styles.CreateMeso}>
            {meso.days.map((day, index) => (
                <DayColumn
                    key={index}
                    day={day}
                    deleteDay={deleteDay}
                    setMuscleGroup={(exerciseIndex, muscleGroup) => setMuscleGroup(index, exerciseIndex, muscleGroup)}
                    setExerciseName={(exerciseIndex, exerciseName) => setExerciseName(index, exerciseIndex, exerciseName)}
                    addExercise={() => addExercise(index)}
                />
            ))};
            <button onClick={addDay}>+ Add a Day</button>
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