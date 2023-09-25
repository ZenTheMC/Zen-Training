import React, {useState} from "react";
import { Link } from "react-router-dom";
import HelpMenu from "./HelpMenu";
import styles from "./Sidebar.module.css";
import { auth } from "./Firebase";
import { signOut } from "firebase/auth";

const Sidebar = () => {
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
            <button className={styles.Help} onClick={() => setShowHelp(!showHelp)}>User Guide</button>
            {showHelp && <HelpMenu onClose={() => setShowHelp(false)} />}
            <Link className={styles.Link} to="/today">Run Mesocycle</Link>
            <Link className={styles.Link} to="/newmeso">Create Mesocycle</Link>
            <Link className={styles.Link} to="/mesocycles">Your Mesocycles</Link>
            <button className={styles.SignOutButton} type="button" onClick={handleSignOut}>Sign Out</button>
        </div>
    );
}

export default Sidebar;