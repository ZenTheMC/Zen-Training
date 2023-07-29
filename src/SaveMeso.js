import React from "react";
import { addMesocycle } from "./FirebaseFunctions";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./Firebase";

const SaveMeso = ({ meso, setMeso, mesoName, setMesoName }) => {
    const [user] = useAuthState(auth);
    const userId = user ? user.uid : null;

    const handleSaveMeso = async (event) => {
        event.preventDefault();

        if (userId === null) {
            alert("Please sign in to save a mesocycle.");
            return;
        }

        // Prepare the mesocycle data
        const mesocycle = {
            name: mesoName,  // include the name in the mesocycle data
            ...meso
        };

        // Submit meso data to Firebase
        await addMesocycle(userId, mesocycle);

        // Clear the form fields
        setMesoName("");  // reset the mesocycle name

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
                placeholder="Enter a name for the mesocycle"
                required
            />
            <button type="submit">Save Mesocycle</button>
        </form>
    );
}

export default SaveMeso;