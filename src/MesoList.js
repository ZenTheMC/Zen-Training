import React, { useState, useEffect } from "react";
import { deleteMesocycle, getMesocycles, updateMesocycleNote } from './FirebaseFunctions';
import styles from './MesoList.module.css';
import MesoListModal from "./MesoListModal";

const MesoList = ({ userId }) => {
  const [mesocycles, setMesocycles] = useState([]);
  const [notes, setNotes] = useState({});
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [modalMessage, setModalMessage] = useState();
  const [targetMesoId, setTargetMesoId] = useState(null);

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

  const handleSaveNote = (mesocycleId) => {
    setModalMessage("Do you want to save this note?");
    setShowConfirmModal(true);
    setTargetMesoId(mesocycleId);
  };

  const handleSaveNoteConfirm = async () => {
    try {
        await updateMesocycleNote(userId, targetMesoId, notes[targetMesoId]);
        setShowConfirmModal(false);
        setTargetMesoId(null);
    } catch (error) {
        console.error("Error saving note:", error);
    }
  };

  const handleDeleteMesoPrompt = (mesocycleId) => {
    setModalMessage("Are you sure you want to delete this mesocycle? This action cannot be undone!");
    setShowConfirmModal(true);
    setTargetMesoId(mesocycleId);
  };

  const handleDeleteMesoConfirm = async () => {
    try {
        await deleteMesocycle(userId, targetMesoId);
        const updateMesocycles = mesocycles.filter(meso => meso.id !== targetMesoId);
        setMesocycles(updateMesocycles);
        setShowConfirmModal(false);
        setTargetMesoId(null);
    } catch (error) {
        console.error("Error deleting mesocycle:", error);
    }
  };

  const handleModalCancel = () => {
    setShowConfirmModal(false);
    setTargetMesoId(null);
  };

  // Implement a sorting mechanism to sort mesos by name or creation date
  // Add buttons to trigger sorting

  // Implement a modal to show detailed info about a meso
  // Display a Details button for each meso to open the modal

  return (
    <div className={styles.MesoList}>
      {mesocycles.map(meso => (
        <div key={meso.id} className={styles.MesoItem}>
          <div className={styles.MesoText}>
            <span className={styles.MesoName}><strong>{meso.name}</strong> -- <em>({meso.weeks} wks)</em> -- </span>
            {meso.completed && <span className={styles.Check}>✓</span>}
            <span className={styles.CreatedAt}>{formatDate(meso.createdAt)}</span>
          </div>
          <div className={styles.MesoControls}>
            <textarea value={notes[meso.id] || meso.note || ""} onChange={(e) => setNotes({ ...notes, [meso.id]: e.target.value })} />
            <button className={styles.SaveNote} onClick={() => handleSaveNote(meso.id)}>Save Note</button>
            <button className={styles.Delete} onClick={() => handleDeleteMesoPrompt(meso.id)}>Delete</button>
          </div>
        </div>
      ))}
      <MesoListModal
        show={showConfirmModal}
        message={modalMessage}
        onConfirm={() => {
          if (modalMessage.includes("delete")) {
              handleDeleteMesoConfirm();
          } else if (modalMessage.includes("save")) {
              handleSaveNoteConfirm();
          }
        }}
        onCancel={handleModalCancel}
      />
    </div>
  );
};

export default MesoList;