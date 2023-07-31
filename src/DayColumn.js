import React from "react";
import MuscleGroupForm from "./MuscleGroupForm";
import styles from "./DayColumn.module.css";

const DayColumn = ({ day, dayIndex, deleteDay, setMuscleGroup, setExerciseName, addExercise, exercises, handleDayChange }) => {

    const handleDelete = () => {
        deleteDay(day.dayOfWeek);
    }

    return (
        <div className={styles.DayColumn}>
            <label>
                Day of the week:
                <select 
                    value={day.dayOfWeek} 
                    onChange={(event) => { handleDayChange(dayIndex, event.target.value); }}>
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
                        setMuscleGroup={(muscleGroup) => setMuscleGroup(dayIndex, index, muscleGroup)}
                        exerciseName={exercise.name}
                        setExerciseName={(exerciseName) => setExerciseName(dayIndex, index, exerciseName)}
                        addExercise={() => addExercise(dayIndex)}
                        exercises={exercises}
                    />
                    <button onClick={() => addExercise(dayIndex)}>+ Add a muscle group</button> {/* Removed addExerciseField */}
                </div>
            ))}
        </div>
    );
};

export default DayColumn;