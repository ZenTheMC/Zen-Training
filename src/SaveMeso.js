import React from "react";
import { addMesocycle } from "./FirebaseFunctions";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./Firebase";
import styles from "./SaveMeso.module.css";

const SaveMeso = ({ meso, setMeso, mesoName, setMesoName, mesoWeeks, setMesoWeeks }) => {
    const [user] = useAuthState(auth);
    const userId = user ? user.uid : null;

    const handleSaveMeso = async (event) => {
        event.preventDefault();
    
        if (userId === null) {
            alert("Please sign in to save a mesocycle.");
            return;
        }
    
        if (mesoName && mesoWeeks) {
            const replicatedDays = Array.from({ length: Number(mesoWeeks) }, () => meso.days).flat();
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