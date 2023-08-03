import React, { useState, useEffect } from 'react';
import Calendar from './Calendar';
import MesoInfo from './MesoInfo';

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

  // Fetch mesocycle data from Firebase (will be implemented later)
  const fetchMesocycleData = () => {
    // Fetch data from Firebase and update state
  };

  useEffect(() => {
    fetchMesocycleData();
  }, []);

  return (
    <div>
      <h1>{mesocycle.name}</h1>
      <div>
        Week: {currentWeek} <br />
        Day: {currentDay}
      </div>
      <Calendar
        weeks={mesocycle.weeks}
        days={mesocycle.days}
        onSelectDay={handleSelectDay}
      />
      {/* TODO: Add other components such as ExerciseList and ExerciseCards */}
      <MesoInfo name={mesocycle.name} currentWeek={currentWeek} currentDay={currentDay} />
    </div>
  );
};

export default CurrentDay;
