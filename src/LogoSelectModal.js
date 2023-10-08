import React from 'react';
import styles from './LogoSelectModal.module.css';
import logo1 from './Training-App-Logo1.jpg';
import logo2 from './Training-App-Logo2.jpg';
import logo3 from './Training-App-Logo3.jpg';
import { logoMapping } from './LogoUtils';

const LogoSelectionModal = ({ isOpen, onSelect }) => {
  if (!isOpen) return null;

  const handleLogoClick = (logoKey) => {
    console.log("Logo clicked:", logoMapping[logoKey]);
    onSelect(logoKey);
  };


  return (
    <div className={styles.LogoModalOverlay}>
      <div className={styles.LogoModalContent}>
        <img className={styles.Logos} src={logo1} onClick={() => handleLogoClick('logo1')} alt="Logo 1" />
        <img className={styles.Logos} src={logo2} onClick={() => handleLogoClick('logo2')} alt="Logo 2" />
        <img className={styles.Logos} src={logo3} onClick={() => handleLogoClick('logo3')} alt="Logo 3" />
      </div>
    </div>
  );
};

export default LogoSelectionModal;