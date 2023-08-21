import React from "react";

const MesoInfo = ({ name, currentWeek, currentDay }) => {
    return (
        <div>
            <h3>Mesocycle Information</h3>
            <p><strong>Name:</strong> {name}</p>
            <p><strong>Current Week:</strong> {currentWeek}</p>
            <p><strong>Current Day:</strong> {currentDay}</p>
        </div>
    );
};

export default MesoInfo;