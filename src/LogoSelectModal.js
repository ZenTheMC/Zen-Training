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
    onSelect(logoKey);  // Pass the logo key, not the path
  };


  return (
    <div className={styles.logoModalOverlay}>
      <div className="logoModalContent">
        <img src={logo1} onClick={() => handleLogoClick('logo1')} alt="Logo 1" />
        <img src={logo2} onClick={() => handleLogoClick('logo2')} alt="Logo 2" />
        <img src={logo3} onClick={() => handleLogoClick('logo3')} alt="Logo 3" />
      </div>
    </div>
  );
};

export default LogoSelectionModal;