import React from "react";
import MuscleGroupForm from "./MuscleGroupForm";
import ExerciseForm from "./ExerciseForm";
import styles from "./DayColumn.module.css";

const DayColumn = ({ day, /* TODO: Add props for the necessary functions. */ }) => {
    return (
        <div className={styles.DayColumn}>
            {/* Render the select menu for the day of the week and the delete button. */}
            {/* TODO: Implement the select menu and the delete button. */}
            {/* Render the MuscleGroupForm and ExerciseForm components for each exercise in the day. */}
            {day.exercises.map((exercise, index) => (
                <div key={index}>
                    <MuscleGroupForm
                        muscleGroup={exercise.muscleGroup}
                        // TODO: Pass props for the necessary state and functions
                    />
                    <ExerciseForm
                        exerciseName={exercise.name}
                        // TODO: Pass props for the necessary state and functions
                    />
                </div>
            ))}
            {/* Render the "+ Add a muscke group" button. */}
            {/* TODO: Implement the "+ Add a muscle group" button. */}
        </div>
    );
};

export default DayColumn;