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