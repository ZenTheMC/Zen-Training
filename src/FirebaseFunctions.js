import { db } from './Firebase';

export const addMesocycle = async (userId, mesocycle) => {
    try {
        const docRef = await db.collection('users').doc(userId).collection('mesocycles').add(mesocycle);
        console.log("Document written with ID: ", docRef.id);
    } catch (error) {
        console.error("Error adding document: ", error);
    }
}