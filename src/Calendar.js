import React from 'react';

const Calendar = ({ weeks, days, onSelectDay }) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            {Array.from({ length: weeks }, (_, i) => (
              <th key={i}>{`wk ${i + 1}`}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {days.map((day, dayIndex) => (
            <tr key={dayIndex}>
              {Array.from({ length: weeks }, (_, weekIndex) => (
                <td
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
