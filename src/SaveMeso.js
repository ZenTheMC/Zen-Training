import React from "react";
import { addMesocycle } from "./FirebaseFunctions";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./Firebase";
import styles from "./SaveMeso.module.css";

const SaveMeso = ({ meso, setMeso, mesoName, setMesoName, mesoWeeks, setMesoWeeks, formIsValid }) => {
    const [user] = useAuthState(auth);
    const userId = user ? user.uid : null;

    const deepCopy = (object) => JSON.parse(JSON.stringify(object));

    const handleSaveMeso = async (event) => {
        event.preventDefault();
    
        if (userId === null) {
            alert("Please sign in to save a mesocycle.");
            return;
        }
    
        if (mesoName && mesoWeeks) {
            // Add week property to each day
            const replicatedDays = [];
            for (let week = 1; week <= Number(mesoWeeks); week++) {
                meso.days.forEach(day => {
                    const deepCopiedDay = deepCopy(day); // Use deepCopy here
                    replicatedDays.push({ ...deepCopiedDay, week, completed: false });; // Add week and completed property here
                });
            }
    
            const mesocycle = {
                name: mesoName,
                weeks: mesoWeeks,
                days: replicatedDays,
            };
    
            addMesocycle(userId, mesocycle);
            setMeso({ days: [] });
            setMesoName("");
            setMesoWeeks("");
        } else {
            alert("Please enter a mesocycle name and length");
        }
    };

    return (
        <div className={styles.SaveMeso}>
            <form onSubmit={handleSaveMeso}>
                <button className={styles.SubmitButton} type="submit">Save Mesocycle</button>
            </form>
        </div>
    );
}

export default SaveMeso;