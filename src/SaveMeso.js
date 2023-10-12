import React from "react";
import { addMesocycle } from "./FirebaseFunctions";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./Firebase";
import styles from "./SaveMeso.module.css";

const SaveMeso = ({ meso, setMeso, mesoName, setMesoName, mesoWeeks, setMesoWeeks, formIsValid, setAttemptedSubmit, onSuccessfulSave }) => {
    const [user] = useAuthState(auth);
    const userId = user ? user.uid : null;

    const deepCopy = (object) => JSON.parse(JSON.stringify(object));

    const handleSaveMeso = async (event) => {
        event.preventDefault();
        setAttemptedSubmit(true);
    
        if (userId === null) {
            alert("Please sign in to save a mesocycle.");
            return;
        }

        if (!formIsValid) {
            return;
        }
    
        if (mesoName && mesoWeeks) {
            const replicatedDays = [];
            for (let week = 1; week <= Number(mesoWeeks); week++) {
                meso.days.forEach(day => {
                    const deepCopiedDay = deepCopy(day);
                    replicatedDays.push({ ...deepCopiedDay, week, completed: false });;
                });
            }
    
            const mesocycle = {
                name: mesoName,
                weeks: mesoWeeks,
                days: replicatedDays,
            };
    
            addMesocycle(userId, mesocycle);
            setMeso({
                days: [
                    { dayOfWeek: "", exercises: [{ muscleGroup: "", name: "" }] }
                ]
            });
            setMesoName("");
            setMesoWeeks("");
            setAttemptedSubmit(false);
            onSuccessfulSave();
        } else {
            alert("Please enter a mesocycle name and length");
        }
    };

    return (
        <div className={styles.SaveMeso}>
            <form onSubmit={handleSaveMeso}>
                {!formIsValid && <p className={styles.ValidationMessage}>Fill out all fields and ensure 4-6 weeks!</p>}
                <button className={`${styles.SubmitButton} ${!formIsValid ? styles.SubmitButtonDisabled : ''}`} type="submit">Save Mesocycle</button>
            </form>
        </div>
    );
}

export default SaveMeso;