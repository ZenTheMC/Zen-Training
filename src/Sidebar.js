import { Link } from "react-router-dom";

const Sidebar = () => {
    return (
        <div>
            {/* Other sidebar content */}
            <Link to="/newmeso">Create Mesocycle Page</Link>
        </div>
    );
}

export default Sidebar;