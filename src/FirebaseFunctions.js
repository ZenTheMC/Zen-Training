import { db } from './Firebase';
import { collection, doc, addDoc, getDocs } from "firebase/firestore";

export const addMesocycle = async (userId, mesocycle) => {
    try {
        const docRef = await addDoc(collection(doc(db, 'users', userId), 'mesocycles'), mesocycle);
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