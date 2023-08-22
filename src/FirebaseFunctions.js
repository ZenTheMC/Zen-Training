import { db } from './Firebase';
import { collection, doc, addDoc, getDocs, updateDoc, serverTimestamp } from "firebase/firestore";

export const addMesocycle = async (userId, mesocycle) => {
    try {
        const mesocycleWithTimestamp = {
            ...mesocycle,
            createdAt: serverTimestamp(),
            completed: false // Assuming all new mesocycles are initially incompleted
        };
        const docRef = await addDoc(collection(doc(db, 'users', userId), 'mesocycles'), mesocycleWithTimestamp);
        console.log("Document written with ID: ", docRef.id);
    } catch (error) {
        console.error("Error adding document: ", error);
    }
}

export const getMesocycles = async (userId) => {
    const mesocyclesRef = collection(doc(db, 'users', userId), 'mesocycles');
    const mesocyclesSnap = await getDocs(mesocyclesRef);

    const mesocycles = mesocyclesSnap.docs.map(doc => doc.data());
    return mesocycles;
}

export const updateMesocycleCompletionStatus = async (userId, mesocycleId) => {
    try {
        const mesocycleRef = doc(db, 'users', userId, 'mesocycles', mesocycleId);
        await updateDoc(mesocycleRef, { completed: true });
        console.log("Mesocycle completion status updated.");
    } catch (error) {
        console.error("Error updating mesocycle completion status: ", error);
    }
};