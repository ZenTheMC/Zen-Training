import React, { useState, useEffect } from "react";
import { db, auth } from "./Firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import Calendar from './Calendar';
import MesoInfo from './MesoInfo';
import { getMesocycles, updateMesocycleCompletionStatus } from './FirebaseFunctions';
import styles from './CurrentDay.module.css';

const CurrentDay = ({ userId }) => {

  const [currentWeek, setCurrentWeek] = useState();
  const [currentDay, setCurrentDay] = useState("");
  const [exerciseSets, setExerciseSets] = useState({});
  const [currentMesocycleId, setCurrentMesocycleId] = useState(null);

  const [mesocycle, setMesocycle] = useState({
    name: "",
    weeks: "",
    days: [],
  });

  const handleSelectDay = (week, dayOfWeek) => {
    setCurrentWeek(week);
    setCurrentDay(dayOfWeek);
  };

  // Fetch mesocycle data from Firebase
  const fetchMesocycleData = async () => {
    try {
      const mesocycles = await getMesocycles(userId);
      if (mesocycles && mesocycles.length > 0) {
        // Sort by completion status and creation time
        mesocycles.sort((a, b) => {
          if (a.completed && !b.completed) return 1;
          if (!a.completed && b.completed) return -1;
          return b.createdAt.seconds - a.createdAt.seconds;  // Most recent comes first
        });

        setCurrentMesocycleId(mesocycles[0].id); // Store the id of the current mesocycle
        setMesocycle(mesocycles[0]);  // Fetch the first mesocycle based on sorted conditions
      } else {
        console.log("No mesocycles found for the user!");
      }
    } catch (error) {
      console.error("Error fetching mesocycle data:", error);
    }
  };

  useEffect(() => {
    fetchMesocycleData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleWorkoutCompletion = (userId, mesocycleId) => {
    // Update workout data, etc.

    // Check if it's the last day of the last week
    if (currentWeek === mesocycle.weeks && currentDay === mesocycle.days[mesocycle.days.length - 1].dayOfWeek) {
      updateMesocycleCompletionStatus(userId, mesocycleId);  // This function will update the status in Firebase
    } else {
      // Logic to proceed to the next day or week
    }
  };

  const calculateRIR = (week, totalWeeks) => {
    if (week === totalWeeks) return 8;
    return totalWeeks - week;
  };

  const addSet = (exerciseName) => {
    console.log('addSet is called');
    const newSet = { weight: "", reps: "" };
    const updatedSets = exerciseSets[exerciseName] ? [...exerciseSets[exerciseName], newSet] : [newSet];
    setExerciseSets({ ...exerciseSets, [exerciseName]: updatedSets });
    console.log("Updated sets:", updatedSets);
  };
  
  const removeSet = (exerciseName) => {
    console.log('removeSet is called');
    const updatedSets = exerciseSets[exerciseName] ? exerciseSets[exerciseName].slice(0, -1) : [];
    setExerciseSets({ ...exerciseSets, [exerciseName]: updatedSets });
    console.log("Updated sets after removal:", updatedSets);
  };

  const handleSetChange = (exerciseName, setIndex, field, value) => {
    setExerciseSets(prevState => {
      const updatedSets = [...prevState[exerciseName]];
      updatedSets[setIndex][field] = value;
      return {
        ...prevState,
        [exerciseName]: updatedSets
      };
    });
  };

  useEffect(() => {
    console.log("exerciseSets has changed:", exerciseSets);
  }, [exerciseSets]);

  const currentDayExercises = mesocycle.days.find(day => day.dayOfWeek === currentDay);
  const currentDayIndex = mesocycle.days.findIndex(day => day.dayOfWeek === currentDay);

  useEffect(() => {
    if (currentDayExercises) {
      const initialSets = {};
      currentDayExercises.exercises.forEach(exercise => {
        initialSets[exercise.name] = Array.from({ length: 2 }, () => ({ weight: "", reps: "" }));
      });
      setExerciseSets(initialSets);
    }
  }, [currentDayExercises]);

  const logSet = async (dayIndex, exerciseIndex, setIndex, setData) => {
    
    if (dayIndex === -1) {
      console.error("Current day not found in mesocycle.days array");
      return;
    }
    
    try {
      const userId = auth.currentUser.uid;
      const mesocycleId = currentMesocycleId;
      const mesocycleRef = doc(db, 'users', userId, 'mesocycles', mesocycleId);

      // Create the new set data
      const newSetData = {
          completed: true,
          weight: setData.weight,
          reps: setData.reps,
      };

      // Fetch the current mesocycle document
      const mesocycleDoc = await getDoc(mesocycleRef);
      const mesocycleData = mesocycleDoc.data();

      // Update the sets array in the mesocycle data
      if (!mesocycleData.days[dayIndex].exercises[exerciseIndex].sets) {
          mesocycleData.days[dayIndex].exercises[exerciseIndex].sets = [];
      }
      mesocycleData.days[dayIndex].exercises[exerciseIndex].sets[setIndex] = newSetData;

      // Write the entire mesocycle data back to Firestore
      await setDoc(mesocycleRef, mesocycleData);
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };


  return (
    <div className={styles.CurrentDay}>
      {console.log('exerciseSets in render:', exerciseSets)}
      <MesoInfo name={mesocycle.name} currentWeek={currentWeek} currentDay={currentDay} />
      <Calendar
        weeks={mesocycle.weeks}
        days={mesocycle.days}
        onSelectDay={handleSelectDay}
      />
      <h2 className={styles.Title}>Training Session</h2>
      {currentDayExercises && currentDayExercises.exercises.map((exercise, exerciseIndex) => (
        <div className={styles.Exercise} key={exerciseIndex}>
          <div className={styles.ExerciseNameContainer}>
            <span className={styles.ExerciseName}>{exercise.name}</span>
            <div className={styles.Buttons}>
              <button onClick={() => addSet(exercise.name)}>+</button>
              <button onClick={() => removeSet(exercise.name)}>-</button>
            </div>
          </div>
          <p className={styles.MuscleGroup}>{exercise.muscleGroup}</p>
          <p className={styles.Rir}>RIR {calculateRIR(currentWeek, mesocycle.weeks)}</p>
          {(exerciseSets[exercise.name] || Array(2).fill({ weight: "", reps: "" })).map((set, setIndex) => (
            <div key={setIndex}>
              <input placeholder="Weight" value={set.weight} onChange={(e) => handleSetChange(exercise.name, setIndex, "weight", e.target.value)} />
              <input placeholder="Reps" value={set.reps} onChange={(e) => handleSetChange(exercise.name, setIndex, "reps", e.target.value)} />
              <button onClick={() => logSet(currentDayIndex, exerciseIndex, setIndex, set)}>Log Set</button>
            </div>
          ))}
          {/* Add a button or mechanism to save this data */}
        </div>
      ))}
      {/* TODO: Add other components such as ExerciseList and ExerciseCards */}
    </div>
  );
};

export default CurrentDay;
