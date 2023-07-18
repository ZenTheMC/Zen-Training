import { db } from './Firebase';
import { collection, doc, addDoc } from "firebase/firestore";

export const addMesocycle = async (userId, mesocycle) => {
    try {
        const docRef = await addDoc(collection(doc(db, 'users', userId), 'mesocycles'), mesocycle);
        console.log("Document written with ID: ", docRef.id);
    } catch (error) {
        console.error("Error adding document: ", error);
    }
}