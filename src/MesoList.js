import React, { useState, useEffect, useRef } from "react";
import { deleteMesocycle, getMesocycles, updateMesocycleNote } from './FirebaseFunctions';
import styles from './MesoList.module.css';
import MesoListModal from "./MesoListModal";
import SearchSort from "./SearchSort";

const MesoList = ({ userId }) => {
  const [mesocycles, setMesocycles] = useState([]);
  const [notes, setNotes] = useState({});
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [modalMessage, setModalMessage] = useState();
  const [targetMesoId, setTargetMesoId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("default");


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

  const handleSearch = (term) => {
    setSearchTerm(term);
  };
  
  const handleSort = (option) => {
    setSortOption(option);
  };  

  const textAreaRefs = useRef({});

  const adjustTextAreaHeight = (id) => {
    if (textAreaRefs.current[id]) {
      textAreaRefs.current[id].style.height = "auto";
      textAreaRefs.current[id].style.height = `${textAreaRefs.current[id].scrollHeight}px`;
    }
  };

  useEffect(() => {
    mesocycles.forEach(meso => adjustTextAreaHeight(meso.id));
  }, [notes, mesocycles]);

  let displayedMesocycles = mesocycles;

  if (searchTerm) {
    displayedMesocycles = displayedMesocycles.filter(meso => meso.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }

  if (sortOption === 'date') {
    displayedMesocycles = displayedMesocycles.sort((a, b) => b.createdAt.seconds - a.createdAt.seconds);
  } else if (sortOption === 'status') {
    displayedMesocycles = displayedMesocycles.sort((a, b) => (a.completed === b.completed) ? 0 : a.completed ? 1 : -1);
  }
  
  useEffect(() => {
    displayedMesocycles.forEach(meso => adjustTextAreaHeight(meso.id));
  }, [displayedMesocycles]);

  // Implement a modal to show detailed info about a meso
  // Display a Details button for each meso to open the modal

  return (
    <div className={styles.MesoList}>
      <SearchSort onSearch={handleSearch} onSort={handleSort} />
      {displayedMesocycles.map(meso => (
        <div key={meso.id} className={styles.MesoItem}>
          <div className={styles.MesoText}>
            <span className={styles.MesoName}><strong>{meso.name}</strong> -- <em>({meso.weeks} wks)</em> -- </span>
            {meso.completed && <span className={styles.Check}>✓</span>}
            <span className={styles.CreatedAt}>{formatDate(meso.createdAt)}</span>
          </div>
          <div className={styles.MesoControls}>
            <textarea
              key={meso.id}
              ref={ref => textAreaRefs.current[meso.id] = ref}
              value={notes[meso.id] || meso.note || ""}
              onChange={(e) => {
                setNotes({ ...notes, [meso.id]: e.target.value });
                adjustTextAreaHeight(meso.id);
              }}
            />
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