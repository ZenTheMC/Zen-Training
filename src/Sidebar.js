import React, {useState} from "react";
import { Link } from "react-router-dom";
import HelpMenu from "./HelpMenu";
import styles from "./Sidebar.module.css";
import { auth } from "./Firebase";
import { signOut } from "firebase/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faCalendarAlt, faDumbbell, faPowerOff, faUser, faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

const Sidebar = ({ logo, onLogoClick, toggleDarkMode, isDarkMode }) => {
    const [showHelp, setShowHelp] = useState(false);

    const handleSignOut = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error("Error signing out", error);
        }
    };

    return (
        <div className={styles.Sidebar}>
            <img
                src={logo}
                alt="Zen's Training App Logo"
                className={styles.Logo}
                onClick={() => onLogoClick()}
            />
            <button className={styles.Help} onClick={() => setShowHelp(!showHelp)}><FontAwesomeIcon icon={faBook}/></button>
            {showHelp && <HelpMenu onClose={() => setShowHelp(false)} />}
            <button className={styles.ToggleTheme} onClick={toggleDarkMode}>
                <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} />
            </button>
            <Link className={styles.Link} to="/today"><FontAwesomeIcon icon={faDumbbell}/> Run Meso</Link>
            <Link className={styles.Link} to="/newmeso"><FontAwesomeIcon icon={faCalendarAlt}/> Create Meso</Link>
            <Link className={styles.Link} to="/mesocycles"><FontAwesomeIcon icon={faUser}/> Your Mesocycles</Link>
            <button className={styles.SignOutButton} type="button" onClick={handleSignOut}><FontAwesomeIcon icon={faPowerOff}/></button>
        </div>
    );
}

export default Sidebar;