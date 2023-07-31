import React, { useState } from "react";
import { addMesocycle } from "./FirebaseFunctions";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./Firebase";

const SaveMeso = ({ meso, setMeso, mesoName, setMesoName }) => {
    const [user] = useAuthState(auth);
    const userId = user ? user.uid : null;
    const [mesoLength, setMesoLength] = useState("");

    const handleSaveMeso = async (event) => {
        event.preventDefault();

        if (userId === null) {
            alert("Please sign in to save a mesocycle.");
            return;
        }

        // Prepare meso name and meso length in the meso data
        const mesocycle = {
            name: mesoName, 
            length: mesoLength, 
            ...meso
        };

        // Submit meso data to Firebase
        await addMesocycle(userId, mesocycle);

        // Clear the form fields
        setMesoName("");
        setMesoLength("");

        // Reset the meso state in the CreateMeso component
        setMeso({
            name: "",
            weeks: "",
            days: []
        });

    };

    return (
        <form onSubmit={handleSaveMeso}>
            <input
                type="text"
                value={mesoName}
                onChange={(e) => setMesoName(e.target.value)}
                placeholder="Meso Name"
                required
            />
            <input
                type="number"
                value={mesoLength}
                onChange={(e) => setMesoLength(e.target.value)}
                placeholder="Meso Length (Weeks)"
                required
            />
            <button type="submit">Save Mesocycle</button>
        </form>
    );
}

export default SaveMeso;