import React from 'react';
import styles from './MesoDetailsModal.module.css';

const MesoDetailsModal = ({ meso, onClose }) => {
  if (!meso) return null;

  const uniqueExercises = [...new Set(meso.days.flatMap(day => day.exercises).map(exercise => exercise.name))];

  const daysOfWeek = Array.from(new Set(meso.days.map(day => day.dayOfWeek)));

  return (
    <div className={styles.ModalBackdrop}>
      <div className={styles.ModalContent}>
        <h2>{meso.name}</h2>
        <p><strong>Status:</strong> {meso.completed ? "Completed ✓" : "Ongoing"}</p>
        <p><strong>Meso Length:</strong> {meso.weeks} Weeks</p>
        <p><strong>Training Days:</strong> {daysOfWeek.join(", ")}</p>
        <p>{daysOfWeek.length} training days per week</p>
        <p><strong>Exercises:</strong> {uniqueExercises.join(", ")}</p>
        <p><strong>Notes:</strong> {meso.note}</p>
        <p><strong>Created On:</strong> {new Date(meso.createdAt.seconds * 1000).toLocaleDateString()}</p>
        <button className={styles.Close} onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default MesoDetailsModal;