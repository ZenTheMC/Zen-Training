import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { auth } from "./Firebase";
import CreateMeso from "./CreateMeso";
import Sidebar from "./Sidebar";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import { useAuthState } from "react-firebase-hooks/auth";
import CurrentDay from "./CurrentDay";
import MesoList from "./MesoList";

const App = () => {
  const [user] = useAuthState(auth);

  return (
    <div>
      <Router>
        <Sidebar />
        <Routes>
          <Route path="/signin" element={user ? <Navigate to="/newmeso" /> : <SignInForm />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/newmeso" element={user ? <CreateMeso /> : <Navigate to="/signin" />} />
          <Route path="/today" element={user ? <CurrentDay userId={user.uid} /> : <Navigate to="/signin" />} />
          <Route path="/mesocycles" element={user ? <MesoList userId={user.uid} /> : <Navigate to="/signin" />} />
          <Route path="/*" element={<Navigate to="/signin" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;