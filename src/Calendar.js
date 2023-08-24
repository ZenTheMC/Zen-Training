import React from 'react';
import styles from './Calendar.module.css';

const Calendar = ({ weeks, days, onSelectDay }) => {
  return (
    <div className={styles.Calendar}>
      <table>
        <thead>
          <tr>
            {Array.from({ length: weeks }, (_, i) => (
              <th key={i}>{`Week ${i + 1}`}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {days.map((day, dayIndex) => (
            <tr key={dayIndex}>
              {Array.from({ length: weeks }, (_, weekIndex) => (
                <td
                  className={styles.Table}
                  key={weekIndex}
                  onClick={() => onSelectDay(weekIndex + 1, day.dayOfWeek)}
                >
                  {day.dayOfWeek}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Calendar;
