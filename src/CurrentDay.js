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
import CompletionModal from "./CompletionModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faMinus } from "@fortawesome/free-solid-svg-icons";


const CurrentDay = ({ userId }) => {

  const [currentWeek, setCurrentWeek] = useState(1);
  const [currentDay, setCurrentDay] = useState("");
  const [exerciseSets, setExerciseSets] = useState({});
  const [currentMesocycleId, setCurrentMesocycleId] = useState(null);
  const [showNoMesoPopup, setShowNoMesoPopup] = useState(false);
  const [showMinSetsWarning, setShowMinSetsWarning] = useState(false);
  const [showEndMesoModal, setShowEndMesoModal] = useState(false);
  const [showValidationPopup, setShowValidationPopup] = useState(false);
  const [showCompletionModal, setShowCompletionModal] = useState(false);

  const [mesocycle, setMesocycle] = useState({
    name: "",
    weeks: "",
    days: [[]],
  });

  const handleSelectDay = async (week, day) => {
    setCurrentWeek(week);
    setCurrentDay(day.dayOfWeek);

    const selectedDayExercisesOriginal = mesocycle.days.flat().find(d => d.dayOfWeek === day.dayOfWeek && d.week === week);

    const selectedDayExercises = JSON.parse(JSON.stringify(selectedDayExercisesOriginal));

    if (week > 1) {
      const previousWeekExercises = mesocycle.days.flat().find(d => d.dayOfWeek === day.dayOfWeek && d.week === week - 1);
      
      selectedDayExercises.exercises.forEach((exercise) => {
          const prevExercise = previousWeekExercises ? previousWeekExercises.exercises.find(e => e.name === exercise.name) : null;
          
          if (prevExercise) {
              exercise.sets.forEach((set, setIndex) => {
                  const prevSet = prevExercise.sets[setIndex];
                  if (prevSet) {
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

  const fetchMesocycleData = async () => {
    try {
      const mesocycles = await getMesocycles(userId);
      if (mesocycles && mesocycles.length > 0) {
        mesocycles.sort((a, b) => {
          if (a.completed && !b.completed) return 1;
          if (!a.completed && b.completed) return -1;
          return a.createdAt.seconds - b.createdAt.seconds;
        });

        if (mesocycles[0].completed) {
        setShowNoMesoPopup(true);
        }

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
        setShowNoMesoPopup(true);
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
    let rir = totalWeeks - week;
    return Math.min(rir, 3);
  };

  const addSet = async (exerciseName) => {
    const newSet = { weight: "", reps: "", completed: false };

    setExerciseSets(prevSets => {
        const updatedSets = prevSets[exerciseName] ? [...prevSets[exerciseName], newSet] : [newSet];
        return { ...prevSets, [exerciseName]: updatedSets };
    });

    setMesocycle(prevMeso => {
        const updatedDays = prevMeso.days.map((weekDays, weekIndex) => {
            if (weekIndex + 1 >= currentWeek) {
                weekDays.map(day => {
                    const targetExercise = day.exercises.find(e => e.name === exerciseName);
                    if (targetExercise) {
                        targetExercise.sets.push({ ...newSet });
                    }
                    return day;
                });
            }
            return weekDays;
        });
        return { ...prevMeso, days: updatedDays };
    });

    setTimeout(async () => {
      const updatedMesocycle = { ...mesocycle, days: mesocycle.days.flat() };
      delete updatedMesocycle.id;
      await updateMesocycle(userId, currentMesocycleId, updatedMesocycle);
    }, 1000);
  };

  const removeSet = async (exerciseName) => {
    if (exerciseSets[exerciseName] && exerciseSets[exerciseName].length <= 2) {
        setShowMinSetsWarning(true);
        return;
    }

    setExerciseSets(prevSets => {
        const updatedSets = prevSets[exerciseName] ? prevSets[exerciseName].slice(0, -1) : [];
        return { ...prevSets, [exerciseName]: updatedSets };
    });

    setMesocycle(prevMeso => {
        const updatedDays = prevMeso.days.map((weekDays, weekIndex) => {
            if (weekIndex + 1 >= currentWeek) {
                weekDays.map(day => {
                    const targetExercise = day.exercises.find(e => e.name === exerciseName);
                    if (targetExercise && targetExercise.sets.length > 2) {
                        targetExercise.sets.pop();
                    }
                    return day;
                });
            }
            return weekDays;
        });
        return { ...prevMeso, days: updatedDays };
    });

    setTimeout(async () => {
        const updatedMesocycle = { ...mesocycle, days: mesocycle.days.flat() };
        delete updatedMesocycle.id;
        await updateMesocycle(userId, currentMesocycleId, updatedMesocycle);
    }, 1000);
  };

  const handleSetChange = (exerciseName, setIndex, field, value) => {
    setExerciseSets(prevState => {
      if (!prevState[exerciseName]) {
        console.error(`Exercise "${exerciseName}" not found in exerciseSets.`);
        return prevState;
      }
      const updatedSets = [...prevState[exerciseName]];
      updatedSets[setIndex][field] = value;
      return {
        ...prevState,
        [exerciseName]: updatedSets
      };
    });
  };

  const currentDayExercises = useMemo(() => {
    return mesocycle.days.flat().find(day => day.dayOfWeek === currentDay && day.week === currentWeek);
  }, [mesocycle.days, currentDay, currentWeek]);
  
  const isCurrentWeekCompleted = useMemo(() => {
    const daysInCurrentWeek = mesocycle.days.flat().filter(day => day.week === currentWeek);
    return daysInCurrentWeek.every(day => day.completed);
  }, [mesocycle.days, currentWeek]);

  const logSet = async (exerciseIndex, setIndex, setData) => {
    
    if (!setData.weight || !setData.reps) {
      setShowValidationPopup(true);
      return;
    }

    const flatDayIndex = mesocycle.days.flat().findIndex(day => day.week === currentWeek && day.dayOfWeek === currentDay);

    if (flatDayIndex === -1) {
      console.error("Current day not found in mesocycle.days array");
      return;
    }
    
    try {
      const userId = auth.currentUser.uid;
      const mesocycleId = currentMesocycleId;
      const mesocycleRef = doc(db, 'users', userId, 'mesocycles', mesocycleId);

      const convertedWeight = Number(setData.weight);
      const convertedReps = Number(setData.reps);

      const newSetData = {
          completed: true,
          weight: convertedWeight,
          reps: convertedReps,
      };

      const mesocycleDoc = await getDoc(mesocycleRef);
      const mesocycleData = mesocycleDoc.data();

      if (!mesocycleData.days[flatDayIndex].exercises[exerciseIndex].sets) {
          mesocycleData.days[flatDayIndex].exercises[exerciseIndex].sets = [];
      }
      mesocycleData.days[flatDayIndex].exercises[exerciseIndex].sets[setIndex] = newSetData;

      const currentDayExercises = mesocycle.days.flat()[flatDayIndex];
      if (currentDayExercises) {
        if (!currentDayExercises.exercises[exerciseIndex].sets) {
          currentDayExercises.exercises[exerciseIndex].sets = [];
        }
        currentDayExercises.exercises[exerciseIndex].sets[setIndex] = newSetData;
      }

      setExerciseSets(prevState => {
        const updatedSets = [...prevState[currentDayExercises.exercises[exerciseIndex].name]];
        updatedSets[setIndex] = newSetData;
        return {
          ...prevState,
          [currentDayExercises.exercises[exerciseIndex].name]: updatedSets
        };
      });

      const allSetsForTheDayAreCompleted = mesocycleData.days[flatDayIndex].exercises.every(exercise => 
        exercise.sets.every(set => set.completed)
      );

      if (allSetsForTheDayAreCompleted) {
        mesocycleData.days[flatDayIndex].completed = true;

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

      const allDaysCompleted = mesocycleData.days.every(day => day.completed);

      if (allDaysCompleted) {
        mesocycleData.completed = true;
        setMesocycle(prevMeso => ({
          ...prevMeso,
          completed: true
        }));

        setShowCompletionModal(true);
      }

      await setDoc(mesocycleRef, mesocycleData);
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };

  const endMesocycleEarly = () => {
    setShowEndMesoModal(true);
  };

  const confirmEndMesocycle = async () => {
    try {
        const userId = auth.currentUser.uid;
        const mesocycleRef = doc(db, 'users', userId, 'mesocycles', currentMesocycleId);
  
        const flattenedDays = mesocycle.days.flat();
        
        const mesoToUpdate = { ...mesocycle, days: flattenedDays, completed: true };
        delete mesoToUpdate.id;
  
        await setDoc(mesocycleRef, mesoToUpdate, { merge: true });
  
        fetchMesocycleData();
    } catch (error) {
        console.error("Error ending mesocycle early:", error);
    }

    setShowEndMesoModal(false);
  };

  const handleStay = () => {
    setShowCompletionModal(false);
  }

  const handleMoveOn = () => {
    setShowCompletionModal(false);
    fetchMesocycleData();
  }

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
      onClose={() => setShowEndMesoModal(false)}
      />
      {showCompletionModal && <CompletionModal handleStay={handleStay} handleMoveOn={handleMoveOn} onClose={() => setShowCompletionModal(false)} />}
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
              <button className={styles.AddSet} onClick={() => addSet(exercise.name)}><FontAwesomeIcon icon={faAdd}/> Set</button>
              <button className={styles.RemoveSet} onClick={() => removeSet(exercise.name)}><FontAwesomeIcon icon={faMinus}/> Set</button>
            </div>
          </div>
          <p className={styles.MuscleGroup}>{exercise.muscleGroup}</p>
          <p className={styles.Rir}>RIR {calculateRIR(currentWeek, mesocycle.weeks)}</p>
          {(exerciseSets[exercise.name] || Array(2).fill({ weight: "", reps: "" })).map((set, setIndex) => {
            const previousWeekExercise = currentWeek > 1 && mesocycle.days.flat().find(d => d.dayOfWeek === currentDay && d.week === currentWeek - 1)?.exercises.find(e => e.name === exercise.name);
            const previousSet = previousWeekExercise && previousWeekExercise.sets ? previousWeekExercise.sets[setIndex] : null;
    
            const suggestedWeight = previousSet ? previousSet.weight + 5 : "";
            const suggestedReps = previousSet ? previousSet.reps + 1 : "";
    
            return (
              <div className={styles.SetContainer} key={setIndex}>
                <input className={styles.Weight} type="number" placeholder={suggestedWeight || "Weight"} value={set.weight} onChange={(e) => handleSetChange(exercise.name, setIndex, "weight", e.target.value)} />
                <input className={styles.Reps} type="number" placeholder={suggestedReps || "Reps"} value={set.reps} onChange={(e) => handleSetChange(exercise.name, setIndex, "reps", e.target.value)} />
                <button className={styles.LogSet} onClick={() => logSet(exerciseIndex, setIndex, set)}>Log Set</button>
                {set.completed && <span> ✓</span>}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default CurrentDay;