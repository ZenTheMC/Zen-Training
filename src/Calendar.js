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
          {Array.from({ length: days[0].length }, (_, dayIndex) => (
            <tr key={dayIndex}>
              {Array.from({ length: weeks }, (_, weekIndex) => (
                <td
                  className={styles.Table}
                  key={weekIndex}
                  onClick={() => onSelectDay(weekIndex + 1, days[weekIndex][dayIndex]?.dayOfWeek)}
                >
                  {days[weekIndex][dayIndex]?.dayOfWeek}
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
