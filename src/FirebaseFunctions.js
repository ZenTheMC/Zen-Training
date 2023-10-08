import { db } from './Firebase';
import { collection, doc, addDoc, getDocs, updateDoc, deleteDoc, serverTimestamp, getDoc } from "firebase/firestore";
import logo2 from './Training-App-Logo2.jpg';

export const defaultLogo = logo2;

export const addMesocycle = async (userId, mesocycle) => {
    try {
        mesocycle.days.forEach(day => {
            day.exercises.forEach(exercise => {
                if (!exercise.sets) {
                    exercise.sets = Array.from({ length: 2 }, () => ({ weight: "", reps: "", completed: false }));
                }
            });
        });

        const mesocycleWithTimestamp = {
            ...mesocycle,
            createdAt: serverTimestamp(),
            completed: false
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

export const deleteMesocycle = async ( userId, mesocycleId) => {
    const mesocycleRef = doc(db, "users", userId, "mesocycles", mesocycleId);
    await deleteDoc(mesocycleRef);
}

export const updateMesocycleNote = async (userId, mesocycleId, note) => {
    const mesocycleRef = doc(db, "users", userId, "mesocycles", mesocycleId);
    await updateDoc(mesocycleRef, { note });
}

export const updateMesocycle = async (userId, mesocycleId, mesocycle) => {
    const mesocycleRef = doc(db, "users", userId, "mesocycles", mesocycleId);
    try {
        await updateDoc(mesocycleRef, mesocycle);
    } catch (error) {
        console.error("Error updating mesocycle:", error);
    }
}

export const saveUserLogoPreference = async (userId, logoPreference) => {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, { logoPreference });
}

export const getUserLogoPreference = async (userId) => {
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
        return userSnap.data().logoPreference;
    }
    return defaultLogo;
}