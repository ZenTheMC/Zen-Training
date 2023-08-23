import { Link } from "react-router-dom";
import styles from "./Sidebar.module.css";
import { auth } from "./Firebase";
import { signOut } from "firebase/auth";

const Sidebar = () => {

    const handleSignOut = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error("Error signing out", error);
        }
    };

    return (
        <div className={styles.Sidebar}>
            {/* Other sidebar content */}
            <Link className={styles.Link} to="/today">Current Day</Link>
            <Link className={styles.Link} to="/newmeso">Create Mesocycle</Link>
            <Link className={styles.Link} to="/workout">Temp Workout Page</Link>
            <button className={styles.SignOutButton} type="button" onClick={handleSignOut}>Sign Out</button>
        </div>
    );
}

export default Sidebar;