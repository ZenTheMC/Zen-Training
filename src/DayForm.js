import React from "react";
import styles from "./DayForm.module.css"

const DayForm = ({ dayOfWeek, setDayOfWeek }) => {
    return (
        <div className={styles.DayForm}>
            <label className={styles.DayOfWeekLabel}>
                Day of the week:
                <select
                    value={dayOfWeek}
                    onChange={(event) => setDayOfWeek(event.target.value)} required>
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
        </div>
    )
}

export default DayForm;