import React, { useState, useEffect } from "react";
import Calendar from './Calendar';
import MesoInfo from './MesoInfo';
import { getMesocycles, updateMesocycleCompletionStatus } from './FirebaseFunctions';
import styles from './CurrentDay.module.css';

const CurrentDay = ({ userId }) => {

  const [currentWeek, setCurrentWeek] = useState();
  const [currentDay, setCurrentDay] = useState("");

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
        <div className={styles.Exercise} key={index}>
          <p className={styles.ExerciseName}>{exercise.name}</p>
          <p className={styles.MuscleGroup}>{exercise.muscleGroup}</p>
          <p className={styles.Rir}>RIR {calculateRIR(currentWeek, mesocycle.weeks)}</p>
          <input placeholder="Weight" />
          <input placeholder="Reps" />
          <input placeholder="Sets" />
          {/* Add a button or mechanism to save this data */}
        </div>
      ))}
      {/* TODO: Add other components such as ExerciseList and ExerciseCards */}
    </div>
  );
};

export default CurrentDay;
