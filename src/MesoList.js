import React, { useState, useEffect } from "react";
import { getMesocycles } from './FirebaseFunctions';
import styles from './MesoList.module.css';

const MesoList = ({ userId }) => {
  const [mesocycles, setMesocycles] = useState([]);

  useEffect(() => {
    const fetchMesocycles = async () => {
      try {
        const fetchedMesocycles = await getMesocycles(userId);
        setMesocycles(fetchedMesocycles);
      } catch (error) {
        console.error("Error fetching mesocycles:", error);
      }
    };

    fetchMesocycles();
  }, [userId]);

  // Helper function to convert Firestore timestamp to readable date
  const formatDate = (timestamp) => {
    if (timestamp && timestamp.seconds) {
      const date = new Date(timestamp.seconds * 1000);
      return `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`;
    }
    return '';
  };

  const handleSaveNote = () => {
    // Display a text-area for notes and a button to save the notes for each meso
  }

  const handleDeleteMeso = () => {
    // handle the deletion process
    // display a delete button next to each meso
  }

  // Implement a sorting mechanism to sort mesos by name or creation date
  // Add buttons to trigger sorting

  // Implement a modal to show detailed info about a meso
  // Display a Details button for each meso to open the modal

  return (
    <div className={styles.MesoList}>
      {mesocycles.map(meso => (
        <div key={meso.id} className={styles.MesoItem}>
          <span className={styles.MesoName}><strong>{meso.name}</strong> -- <em>({meso.weeks} wks)</em> -- </span>
          {meso.completed && <span className={styles.Check}>✓</span>}
          <span className={styles.CreatedAt}>{formatDate(meso.createdAt)}</span>
        </div>
      ))}
    </div>
  );
};

export default MesoList;