import React, { useState, useEffect, useMemo } from "react";
import { db, auth } from "./Firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import Calendar from './Calendar';
import MesoInfo from './MesoInfo';
import { getMesocycles, updateMesocycle } from './FirebaseFunctions';
import styles from './CurrentDay.module.css';
import PopUp from './PopUp';
import MinSetWarn from "./MinSetWarn";
import EndMesoModal from "./EndMesoModal";
import LogSetVal from "./LogSetVal";

const CurrentDay = ({ userId }) => {

  const [currentWeek, setCurrentWeek] = useState(1);
  const [currentDay, setCurrentDay] = useState("");
  const [exerciseSets, setExerciseSets] = useState({});
  const [currentMesocycleId, setCurrentMesocycleId] = useState(null);
  const [showNoMesoPopup, setShowNoMesoPopup] = useState(false);
  const [showMinSetsWarning, setShowMinSetsWarning] = useState(false);
  const [showEndMesoModal, setShowEndMesoModal] = useState(false);
  const [showValidationPopup, setShowValidationPopup] = useState(false);

  const [mesocycle, setMesocycle] = useState({
    name: "",
    weeks: "",
    days: [[]],
  });

  useEffect(() => {
    console.log("CurrentDay component rerendered");
  }, []);


  const handleSelectDay = async (week, day) => {
    setCurrentWeek(week);
    setCurrentDay(day.dayOfWeek);

    mesocycle.days.flat().forEach(d => {
        console.log(`Week: ${d.week}, Day: ${d.dayOfWeek}`);
    });

    const selectedDayExercises = mesocycle.days.flat().find(d => d.dayOfWeek === day.dayOfWeek && d.week === week);
    
    if (week > 1) {
      const previousWeekExercises = mesocycle.days.flat().find(d => d.dayOfWeek === day.dayOfWeek && d.week === week - 1);
      
      // Loop through the exercises of the current week
      selectedDayExercises.exercises.forEach((exercise) => {
          const prevExercise = previousWeekExercises ? previousWeekExercises.exercises.find(e => e.name === exercise.name) : null;
          
          if (prevExercise) {
              exercise.sets.forEach((set, setIndex) => {
                  const prevSet = prevExercise.sets[setIndex];
                  if (prevSet) {
                      // Calculate the progressive overload for each set based on the corresponding set of the previous week
                      set.suggestedWeight = prevSet.weight + 5;
                      set.suggestedReps = prevSet.reps + 1; 
                  }
              });
          }
      });
    }
    
    const initialSets = {};

    if (selectedDayExercises) {
      selectedDayExercises.exercises.forEach((exercise) => {
        initialSets[exercise.name] = exercise.sets && exercise.sets.length > 0 ? exercise.sets : [ { weight: "", reps: "" }, { weight: "", reps: "" } ];
      });
    }
    setExerciseSets(initialSets);
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
          return a.createdAt.seconds - b.createdAt.seconds;  // Oldest incomplete meso rendered
        });

        // Check if the first mesocycle in the sorted list is completed, show the popup
        if (mesocycles[0].completed) {
        setShowNoMesoPopup(true);
        }

        // Convert the days array to a 2D array with unique exercises
        const daysPerWeek = mesocycles[0].days.length / mesocycles[0].weeks;
        const days2D = Array.from({ length: mesocycles[0].weeks }, (_, i) => {
          const daysOfWeek = mesocycles[0].days.slice(i * daysPerWeek, (i + 1) * daysPerWeek);
          return daysOfWeek.map(day => ({
            ...day,
            exercises: day.exercises.map(exercise => ({
              ...exercise,
            })),
          }));
        });

        setCurrentMesocycleId(mesocycles[0].id);
        setMesocycle({ ...mesocycles[0], days: days2D });

      } else {
        setShowNoMesoPopup(true);  // Also show the popup if no mesocycles are found at all
      }
    } catch (error) {
      console.error("Error fetching mesocycle data:", error);
    }
  };

  useEffect(() => {
    fetchMesocycleData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const calculateRIR = (week, totalWeeks) => {
    if (week === totalWeeks) return 8;
    return totalWeeks - week;
  };

  const addSet = async (exerciseName) => {
    const newSet = { weight: "", reps: "", completed: false };

    // 1. Updating local state for exercise sets
    setExerciseSets(prevSets => {
        const updatedSets = prevSets[exerciseName] ? [...prevSets[exerciseName], newSet] : [newSet];
        console.log("Updated exercise sets:", updatedSets);
        return { ...prevSets, [exerciseName]: updatedSets };
    });

    // 2. Updating local state for mesocycle days
    setMesocycle(prevMeso => {
      const updatedDays = prevMeso.days.map(weekDays => weekDays.map(day => {
          const targetExercise = day.exercises.find(e => e.name === exerciseName);
          if (targetExercise) {
              targetExercise.sets.push({ ...newSet });
          }

          // Progressive overload calculations for future weeks
          if (day.week > currentWeek && day.dayOfWeek === currentDay) {
              if (targetExercise && day.week > 1) {
                  const previousWeekExercise = prevMeso.days.flat().find(d => d.dayOfWeek === day.dayOfWeek && d.week === day.week - 1).exercises.find(e => e.name === exerciseName);
                  if (previousWeekExercise) {
                      targetExercise.suggestedWeight = previousWeekExercise.sets[0].weight + 5;
                      targetExercise.suggestedReps = previousWeekExercise.sets[0].reps + 1;
                  }
              }
          }
          return day;
      }));
      console.log("Updated mesocycle days:", updatedDays);
      return { ...prevMeso, days: updatedDays };
    });

    // Wait for state updates to complete
    setTimeout(async () => {
      console.log("Current mesocycle state before Firestore update:", mesocycle);
      // 3. Updating Firestore for the mesocycle
      const updatedMesocycle = { ...mesocycle, days: mesocycle.days.flat() };
      delete updatedMesocycle.id;  // Remove the id field
      await updateMesocycle(userId, currentMesocycleId, updatedMesocycle);
    }, 1000);
  };

  const removeSet = async (exerciseName) => {
    // 1. Check if removing the set would bring the total sets below 2. If so, show warning and exit.
    if (exerciseSets[exerciseName] && exerciseSets[exerciseName].length <= 2) {
        setShowMinSetsWarning(true);
        return;
    }

    // 2. Updating local state for exercise sets
    setExerciseSets(prevSets => {
        const updatedSets = prevSets[exerciseName] ? prevSets[exerciseName].slice(0, -1) : [];
        return { ...prevSets, [exerciseName]: updatedSets };
    });

    // 3. Updating local state for mesocycle days
    setMesocycle(prevMeso => {
        const updatedDays = prevMeso.days.map(weekDays => weekDays.map(day => {
            const targetExercise = day.exercises.find(e => e.name === exerciseName);
            if (targetExercise && targetExercise.sets.length > 2) {
                targetExercise.sets.pop();
            }
            return day;
        }));
        return { ...prevMeso, days: updatedDays };
    });

    // Wait for state updates to complete
    setTimeout(async () => {
        console.log("Current mesocycle state before Firestore update:", mesocycle);
        // 4. Updating Firestore for the mesocycle
        const updatedMesocycle = { ...mesocycle, days: mesocycle.days.flat() };
        delete updatedMesocycle.id;  // Remove the id field
        await updateMesocycle(userId, currentMesocycleId, updatedMesocycle);
    }, 1000);
  };

  const handleSetChange = (exerciseName, setIndex, field, value) => {
    setExerciseSets(prevState => {
      if (!prevState[exerciseName]) {
        console.error(`Exercise "${exerciseName}" not found in exerciseSets.`);
        return prevState;  // Return the previous state unchanged.
      }
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

  const currentDayExercises = useMemo(() => {
    return mesocycle.days.flat().find(day => day.dayOfWeek === currentDay && day.week === currentWeek);
  }, [mesocycle.days, currentDay, currentWeek]);
  
  const isCurrentWeekCompleted = useMemo(() => {
    const daysInCurrentWeek = mesocycle.days.flat().filter(day => day.week === currentWeek);
    return daysInCurrentWeek.every(day => day.completed);
}, [mesocycle.days, currentWeek]);

  const logSet = async (exerciseIndex, setIndex, setData) => {
    
    // Validate the weight and reps fields
    if (!setData.weight || !setData.reps) {
      setShowValidationPopup(true);
      return;
    }

    // Calculate the index of the day in the flattened days array
    const flatDayIndex = mesocycle.days.flat().findIndex(day => day.week === currentWeek && day.dayOfWeek === currentDay);

    if (flatDayIndex === -1) {
      console.error("Current day not found in mesocycle.days array");
      return;
    }
    
    try {
      const userId = auth.currentUser.uid;
      const mesocycleId = currentMesocycleId;
      const mesocycleRef = doc(db, 'users', userId, 'mesocycles', mesocycleId);

      // Convert the weight and reps fields to numbers
      const convertedWeight = Number(setData.weight);
      const convertedReps = Number(setData.reps);

      // Create the new set data
      const newSetData = {
          completed: true,
          weight: convertedWeight,
          reps: convertedReps,
      };

      // Log the new set data for inspection
      console.log('New set data:', newSetData);

      // Fetch the current mesocycle document
      const mesocycleDoc = await getDoc(mesocycleRef);
      const mesocycleData = mesocycleDoc.data();

      // Log the fetched mesocycle data
      console.log('Fetched mesocycle data before any changes:', JSON.parse(JSON.stringify(mesocycleData)));

      // Update the sets array in the mesocycle data
      if (!mesocycleData.days[flatDayIndex].exercises[exerciseIndex].sets) {
          mesocycleData.days[flatDayIndex].exercises[exerciseIndex].sets = [];
      }
      mesocycleData.days[flatDayIndex].exercises[exerciseIndex].sets[setIndex] = newSetData;

      // Log the mesocycle data after updating the sets
      console.log('Updated mesocycle data after modifying sets:', JSON.parse(JSON.stringify(mesocycleData)));

      // Update the sets property of the currentDayExercises object
      const currentDayExercises = mesocycle.days.flat()[flatDayIndex];
      if (currentDayExercises) {
        if (!currentDayExercises.exercises[exerciseIndex].sets) {
          currentDayExercises.exercises[exerciseIndex].sets = [];
        }
        currentDayExercises.exercises[exerciseIndex].sets[setIndex] = newSetData;
      }

      // Update the exerciseSets state
      setExerciseSets(prevState => {
        const updatedSets = [...prevState[currentDayExercises.exercises[exerciseIndex].name]];
        updatedSets[setIndex] = newSetData;
        return {
          ...prevState,
          [currentDayExercises.exercises[exerciseIndex].name]: updatedSets
        };
      });

      // Check if all sets for the day are completed
      const allSetsForTheDayAreCompleted = mesocycleData.days[flatDayIndex].exercises.every(exercise => 
        exercise.sets.every(set => set.completed)
      );

      if (allSetsForTheDayAreCompleted) {
        mesocycleData.days[flatDayIndex].completed = true;

        // Reflect the change in the local state
        const updatedDays = [...mesocycle.days];
        const flatDay = updatedDays.flat()[flatDayIndex];
        if (flatDay) {
          flatDay.completed = true;
          setMesocycle(prevMeso => ({
            ...prevMeso,
            days: updatedDays
          }));
        }
      }

      // Check if all days in the mesocycle are completed
      const allDaysCompleted = mesocycleData.days.every(day => day.completed);

      if (allDaysCompleted) {
        mesocycleData.completed = true;
        // Update local state
        setMesocycle(prevMeso => ({
          ...prevMeso,
          completed: true
        }));
      }

      // *** INSERT CLEANUP CODE HERE ***
      mesocycleData.days.forEach(day => {
        day.exercises.forEach(exercise => {
          exercise.sets.forEach(set => {
            delete set.suggestedWeight;
            delete set.suggestedReps;
          });
        });
      });

      // Log the mesocycle data right before writing to Firestore
      console.log('Final mesocycle data to be written to Firestore:', JSON.parse(JSON.stringify(mesocycleData)));

      // Write the entire mesocycle data back to Firestore
      await setDoc(mesocycleRef, mesocycleData);
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };

  const endMesocycleEarly = () => {
    setShowEndMesoModal(true); // Show the modal
  };

  const confirmEndMesocycle = async () => {

    try {
        const userId = auth.currentUser.uid;
        const mesocycleRef = doc(db, 'users', userId, 'mesocycles', currentMesocycleId);

        // Flatten the mesocycle.days array before sending it to Firestore
        const flattenedDays = mesocycle.days.flat();

        // Update the completed property of the mesocycle to true
        await setDoc(mesocycleRef, { ...mesocycle, days: flattenedDays, completed: true }, { merge: true });

        console.log("Mesocycle status set to completed!");

        fetchMesocycleData();
    } catch (error) {
        console.error("Error ending mesocycle early:", error);
    }

    // Hide the modal
    setShowEndMesoModal(false);
  };

  return (
    <div className={styles.CurrentDay}>
      <button className={styles.EndMesoEarly} onClick={endMesocycleEarly}>End Mesocycle Early</button>
      {mesocycle.days.length > 0 && mesocycle.days[0].length > 0 && (
        <Calendar
          weeks={mesocycle.weeks}
          days={mesocycle.days}
          onSelectDay={handleSelectDay}
          dayCompletionStatus={mesocycle.days.flat().map(day => day.completed)}
        />
      )}
      <EndMesoModal
      show={showEndMesoModal}
      onConfirm={confirmEndMesocycle}
      onCancel={() => setShowEndMesoModal(false)}
      />
      {showValidationPopup && <LogSetVal onClose={() => setShowValidationPopup(false)} />}
      {showNoMesoPopup && <PopUp onClose={() => setShowNoMesoPopup(false)} />}
      {showMinSetsWarning && <MinSetWarn onClose={() => setShowMinSetsWarning(false)} />}
      <MesoInfo
      name={mesocycle.name + (mesocycle.completed ? ' ✓' : '')}
      currentWeek={`${currentWeek}${isCurrentWeekCompleted ? ' ✓' : ''}`}
      currentDay={`${currentDay}${currentDayExercises && currentDayExercises.completed ? ' ✓' : ''}`}
      />
      {currentDayExercises && currentDayExercises.exercises.map((exercise, exerciseIndex) => (
        <div className={styles.Exercise} key={exerciseIndex}>
          <div className={styles.ExerciseNameContainer}>
            <span className={styles.ExerciseName}>{exercise.name}</span>
            <div className={styles.Buttons}>
              <button className={styles.AddSet} onClick={() => addSet(exercise.name)}>Add Set</button>
              <button className={styles.RemoveSet} onClick={() => removeSet(exercise.name)}>Remove Set</button>
            </div>
          </div>
          <p className={styles.MuscleGroup}>{exercise.muscleGroup}</p>
          <p className={styles.Rir}>RIR {calculateRIR(currentWeek, mesocycle.weeks)}</p>
          {(exerciseSets[exercise.name] || Array(2).fill({ weight: "", reps: "" })).map((set, setIndex) => (
            <div key={setIndex}>
              <input className={styles.Weight} type="number" placeholder={set.suggestedWeight || "Weight"} value={set.weight} onChange={(e) => handleSetChange(exercise.name, setIndex, "weight", e.target.value)} />
              <input className={styles.Reps} type="number" placeholder={set.suggestedReps || "Reps"} value={set.reps} onChange={(e) => handleSetChange(exercise.name, setIndex, "reps", e.target.value)} />
              <button className={styles.LogSet} onClick={() => logSet(exerciseIndex, setIndex, set)}>Log Set</button>
              {set.completed && <span> ✓</span>}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default CurrentDay;