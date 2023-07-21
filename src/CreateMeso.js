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

    // TODO: Implement functions to handle adding and deleting days, and saving the meso.

    return (
        <div className={styles.CreateMeso}>
            {/* Render the DayColumn component for each day in the meso */}
            {meso.days.map((day, index) => (
                <DayColumn
                    key={index}
                    day={day}
                    // TODO: Pass functions as props to handle adding and deleting musclegroups/exercises
                />
            ))}
            {/* Render the SaveMeso component */}
            <SaveMeso
                meso={meso}
                setMeso={setMeso}
                // TODO: Pass a function as a prop to handle saving the meso
            />
        </div>
    );
};

export default CreateMeso;