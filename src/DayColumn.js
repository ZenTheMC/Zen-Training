import React from "react";
import MuscleGroupForm from "./MuscleGroupForm";
import ExerciseForm from "./ExerciseForm";
import styles from "./DayColumn.module.css";

const DayColumn = ({ day, deleteDay, setMuscleGroup, setExerciseName, addExercise }) => {
    
    const handleDayChange = (event) => {
        day.dayOfWeek = event.target.value;
    }

    const handleDelete = () => {
        deleteDay(day.dayOfWeek);
    }

    return (
        <div className={styles.DayColumn}>
            <label>
                Day of the week:
                <select value={day.dayOfWeek} onChange={handleDayChange}>
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
            <button onClick={handleDelete}>Delete Day</button>
            {day.exercises.map((exercise, index) => (
                <div key={index}>
                    <MuscleGroupForm
                        muscleGroup={exercise.muscleGroup}
                        setMuscleGroup={(muscleGroup) => setMuscleGroup(index, muscleGroup)}
                        exerciseName={exercise.name}
                        setExerciseName={(exerciseName) => setExerciseName(index, exerciseName)}
                        addExercise={() => addExercise(index)}
                    />
                    <ExerciseForm
                        exerciseName={exercise.name}
                        setExerciseName={(exerciseName) => setExerciseName(index, exerciseName)}
                    />
                    <button onClick={() => addExercise(index)}>+ Add a muscle group</button>
                </div>
            ))};
        </div>
    );
};

export default DayColumn;