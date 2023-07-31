import React from "react";
import MuscleGroupForm from "./MuscleGroupForm";
import styles from "./DayColumn.module.css";

const DayColumn = ({ day, dayIndex, deleteDay, handleDayChange, exercises }) => {
    const handleDelete = () => {
        deleteDay(dayIndex);
    };

    const handleDayDetailsChange = (value) => {
        handleDayChange(dayIndex, value);
    };

    const addExercise = () => {
        handleDayChange(dayIndex, { exercises: [...day.exercises, { muscleGroup: "", name: "" }] });
    };

    return (
        <div className={styles.DayColumn}>
            <label>
                Day of the week:
                <select
                    value={day.dayOfWeek}
                    onChange={(event) => handleDayDetailsChange({ dayOfWeek: event.target.value })}
                    required>
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
            {day.exercises.map((exercise, exerciseIndex) => (
                <MuscleGroupForm
                    key={exerciseIndex}
                    exercise={exercise}
                    handleExerciseChange={(value) => handleDayDetailsChange({ exercises: day.exercises.map((ex, i) => i === exerciseIndex ? { ...ex, ...value } : ex) })}
                    exercises={exercises}
                />
            ))}
            <button onClick={addExercise}>+ Add Exercise</button>
        </div>
    );
};

export default DayColumn;