import { db } from './Firebase';
import { collection, doc, addDoc, getDocs, updateDoc, serverTimestamp } from "firebase/firestore";

export const addMesocycle = async (userId, mesocycle) => {
    try {
        // Loop through each day and add default sets to each exercise
        mesocycle.days.forEach(day => {
            day.exercises.forEach(exercise => {
                if (!exercise.sets) {
                    exercise.sets = Array.from({ length: 2 }, () => ({ weight: "", reps: "", completed: false })); // Default 2 sets
                }
            });
        });

        const mesocycleWithTimestamp = {
            ...mesocycle,
            createdAt: serverTimestamp(),
            completed: false // Assuming all new mesocycles are initially incomplete
        };

        const docRef = await addDoc(collection(doc(db, 'users', userId), 'mesocycles'), mesocycleWithTimestamp);
        console.log("Document written with ID: ", docRef.id);
    } catch (error) {
        console.error("Error adding document: ", error);
    }
};

export const getMesocycles = async (userId) => {
    const mesocyclesRef = collection(doc(db, 'users', userId), 'mesocycles');
    const mesocyclesSnap = await getDocs(mesocyclesRef);

    const mesocycles = mesocyclesSnap.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
    return mesocycles;
};