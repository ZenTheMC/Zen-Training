import React from "react";
import { addMesocycle } from "./FirebaseFunctions";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./Firebase";

const SaveMeso = ({ meso, setMeso, mesoName, setMesoName, mesoWeeks, setMesoWeeks }) => {
    const [user] = useAuthState(auth);
    const userId = user ? user.uid : null;

    const handleSaveMeso = async (event) => {
        event.preventDefault();
    
        if (userId === null) {
            alert("Please sign in to save a mesocycle.");
            return;
        }
    
        // Prepare meso name and meso length in the meso data
        const mesocycle = {
            name: mesoName,
            weeks: mesoWeeks,
            ...meso,
        };
    
        // Submit meso data to Firebase
        await addMesocycle(userId, mesocycle);
    
        // Clear the form fields
        setMesoName("");
        setMesoWeeks("");
    
        // Reset the meso state in the CreateMeso component
        setMeso({
            days: [],
        });
    };

    return (
        <form onSubmit={handleSaveMeso}>
            <button type="submit">Save Mesocycle</button>
        </form>
    );
}

export default SaveMeso;