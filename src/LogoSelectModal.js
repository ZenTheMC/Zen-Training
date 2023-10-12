import React, { useState } from 'react';
import styles from './LogoSelectModal.module.css';
import logo1 from './Training-App-Logo1.jpg';
import logo2 from './Training-App-Logo2.jpg';
import logo3 from './Training-App-Logo3.jpg';
import logo4 from './Training-App-Logo4.jpg';
import logo5 from './Training-App-Logo5.jpg';
import logo6 from './Training-App-Logo6.jpg';
import logo7 from './Training-App-Logo7.jpg';

const LogoSelectionModal = ({ isOpen, onSelect, onClose }) => {
  
  const [activeTab, setActiveTab] = useState('classic');

  if (!isOpen) return null;

  const handleLogoClick = (logoKey) => {
    onSelect(logoKey);
  };


  return (
    <div className={styles.LogoModalOverlay} onClick={onClose}>
      <div className={styles.LogoModalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.Tabs}>
          <button className={`${styles.TabButton} ${activeTab === 'classic' ? styles.ActiveTab : ''}`} onClick={() => setActiveTab('classic')}>Classic Logos</button>
          <button className={`${styles.TabButton} ${activeTab === 'themed' ? styles.ActiveTab : ''}`} onClick={() => setActiveTab('themed')}>Themed Logos</button>
        </div>
        {activeTab === 'classic' && (
          <>
            <img className={styles.Logos} src={logo1} onClick={() => handleLogoClick('logo1')} alt="Logo 1" />
            <img className={styles.Logos} src={logo2} onClick={() => handleLogoClick('logo2')} alt="Logo 2" />
            <img className={styles.Logos} src={logo3} onClick={() => handleLogoClick('logo3')} alt="Logo 3" />
          </>
        )}
        {activeTab === 'themed' && (
          <>
            <img className={styles.Logos} src={logo4} onClick={() => handleLogoClick('logo4')} alt="Logo 4" />
            <img className={styles.Logos} src={logo5} onClick={() => handleLogoClick('logo5')} alt="Logo 5" />
            <img className={styles.Logos} src={logo6} onClick={() => handleLogoClick('logo6')} alt="Logo 6" />
            <img className={styles.Logos} src={logo7} onClick={() => handleLogoClick('logo7')} alt="Logo 7" />
          </>
        )}
      </div>
    </div>
  );
};

export default LogoSelectionModal;