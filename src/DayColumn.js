import React from "react";
import MuscleGroupForm from "./MuscleGroupForm";
import styles from "./DayColumn.module.css";

const DayColumn = ({ day, dayIndex, deleteDay, handleDayChange, exercises, attemptedSubmit }) => {
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
            <div className={styles.DayLabel}>
                <label>
                    Day of the week:
                    <select
                        className={`${attemptedSubmit && !day.dayOfWeek ? styles.InvalidInput : ''}`}
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
                <button className={styles.Delete} onClick={handleDelete}>Delete Day</button>
            </div>
            <div className={styles.Workout}>
                {day.exercises.map((exercise, exerciseIndex) => (
                    <MuscleGroupForm
                        key={exerciseIndex}
                        exercise={exercise}
                        handleExerciseChange={(value) => handleDayDetailsChange({ exercises: day.exercises.map((ex, i) => i === exerciseIndex ? { ...ex, ...value } : ex) })}
                        exercises={exercises}
                        attemptedSubmit={attemptedSubmit}
                    />
                ))}
                <button className={styles.AddMuscleButton} onClick={addExercise}>Add Another Muscle</button>
            </div>
        </div>
    );
};

export default DayColumn;