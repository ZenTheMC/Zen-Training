import React, { useState } from "react";
import MuscleGroupForm from "./MuscleGroupForm";
import styles from "./DayColumn.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faTrashAlt, faMinus } from "@fortawesome/free-solid-svg-icons";
import CustomExercises from "./CustomExercises";
import SuccessModal from "./SuccessModal";

const DayColumn = ({ day, dayIndex, deleteDay, handleDayChange, exercises, attemptedSubmit, fetchExercises }) => {
    const [showCustomExerciseForm, setShowCustomExerciseForm] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const handleExerciseAdded = () => {
        fetchExercises();
        setShowSuccessModal(true);
    };

    const handleDelete = () => {
        deleteDay(dayIndex);
    };

    const handleDayDetailsChange = (value) => {
        handleDayChange(dayIndex, value);
    };

    const addExercise = () => {
        handleDayChange(dayIndex, { exercises: [...day.exercises, { muscleGroup: "", name: "" }] });
    };

    const deleteExercise = (exerciseIndex) => {
        const newExercises = [...day.exercises];
        newExercises.splice(exerciseIndex, 1);
        handleDayDetailsChange({ exercises: newExercises });
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
                        <option value="">Day of the Week</option>
                        <option value="Monday">Monday</option>
                        <option value="Tuesday">Tuesday</option>
                        <option value="Wednesday">Wednesday</option>
                        <option value="Thursday">Thursday</option>
                        <option value="Friday">Friday</option>
                        <option value="Saturday">Saturday</option>
                        <option value="Sunday">Sunday</option>
                    </select>
                </label>
                <button className={styles.Delete} onClick={handleDelete}><FontAwesomeIcon icon={faTrashAlt}/> Day</button>
            </div>
            <div className={styles.Workout}>
                {day.exercises.map((exercise, exerciseIndex) => (
                    <MuscleGroupForm
                        key={exerciseIndex}
                        exercise={exercise}
                        handleExerciseChange={(value) => handleDayDetailsChange({ exercises: day.exercises.map((ex, i) => i === exerciseIndex ? { ...ex, ...value } : ex) })}
                        exercises={exercises}
                        attemptedSubmit={attemptedSubmit}
                        deleteExercise={deleteExercise}
                        exerciseIndex={exerciseIndex}
                    />
                ))}
                <button className={styles.CustomExercise} onClick={() => setShowCustomExerciseForm(true)}>
                    Add Custom Exercise
                </button>
                {showCustomExerciseForm && <CustomExercises onExerciseAdded={handleExerciseAdded} closeCustomExercise={() => setShowCustomExerciseForm(false)} />}
                <SuccessModal
                    show={showSuccessModal} 
                    onClose={() => setShowSuccessModal(false)}
                >
                    <p className={styles.Message}>Exercise added successfully!</p>
                </SuccessModal>
                {day.exercises.length > 1 && (
                    <button className={styles.DeleteMuscleButton} onClick={() => deleteExercise(day.exercises.length - 1)}><FontAwesomeIcon icon={faMinus}/> Exercise</button>
                )}
                <button className={styles.AddMuscleButton} onClick={addExercise}><FontAwesomeIcon icon={faAdd}/> Exercise</button>
            </div>
        </div>
    );
};

export default DayColumn;