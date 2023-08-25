import React, { useState, useEffect } from "react";
import Calendar from './Calendar';
import MesoInfo from './MesoInfo';
import { getMesocycles, updateMesocycleCompletionStatus } from './FirebaseFunctions';
import styles from './CurrentDay.module.css';

const CurrentDay = ({ userId }) => {

  const [currentWeek, setCurrentWeek] = useState();
  const [currentDay, setCurrentDay] = useState("");
  const [exerciseSets, setExerciseSets] = useState({});
  const [shownOptions, setShownOptions] = useState(null);

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
    setExerciseSets(prevState => ({
      ...prevState,
      [exerciseName]: [...(prevState[exerciseName] || [{ weight: "", reps: "" }]), { weight: "", reps: "" }]
    }));
  };

  const removeSet = (exerciseName) => {
    setExerciseSets(prevState => {
      const updatedSets = [...prevState[exerciseName]];
      updatedSets.pop();
      return {
        ...prevState,
        [exerciseName]: updatedSets
      };
    });
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

  const showOptionsForExercises = (exerciseName) => {
    setShownOptions(exerciseName);
  };

  const hideOptions = () => {
    setShownOptions(null);
  };

  const currentDayExercises = mesocycle.days.find(day => day.dayOfWeek === currentDay);

  return (
    <div className={styles.CurrentDay}>
      <MesoInfo name={mesocycle.name} currentWeek={currentWeek} currentDay={currentDay} />
      <Calendar
        weeks={mesocycle.weeks}
        days={mesocycle.days}
        onSelectDay={handleSelectDay}
      />
      <h2 className={styles.Title}>Training Session</h2>
      {currentDayExercises && currentDayExercises.exercises.map((exercise, index) => (
        <div className={styles.Exercise} key={index} onBlur={hideOptions} tabIndex={0}>
          <div className={`${styles.ExerciseName} ${styles.ExerciseNameContainer}`}>
            {exercise.name}
            <span className={styles.Ellipsis} onClick={() => showOptionsForExercises(exercise.name)}>...</span>
            <div className={`${styles.Options} ${shownOptions === exercise.name ? styles.showOptions : ""}`}>
              <button onClick={() => addSet(exercise.name)}>Add Set</button>
              <button onClick={() => removeSet(exercise.name)}>Remove Set</button>
            </div>
          </div>
          <p className={styles.MuscleGroup}>{exercise.muscleGroup}</p>
          <p className={styles.Rir}>RIR {calculateRIR(currentWeek, mesocycle.weeks)}</p>
          {(exerciseSets[exercise.name] || Array(2).fill({ weight: "", reps: "" })).map((set, setIndex) => (
            <div key={setIndex}>
              <input placeholder="Weight" value={set.weight} onChange={(e) => handleSetChange(exercise.name, setIndex, "weight", e.target.value)} />
              <input placeholder="Reps" value={set.reps} onChange={(e) => handleSetChange(exercise.name, setIndex, "reps", e.target.value)} />
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
