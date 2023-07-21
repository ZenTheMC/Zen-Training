import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { auth } from "./Firebase";
import WorkoutForm from "./WorkoutForm";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import { useAuthState } from "react-firebase-hooks/auth";

const App = () => {
  const [user] = useAuthState(auth);

  return (
    <Router>
      <Routes>
        <Route path="/signin" element={user ? <Navigate to="/workout" /> : <SignInForm />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/workout" element={user ? <WorkoutForm /> : <Navigate to="/signin" />} />
        <Route path="/*" element={<Navigate to="/signin" />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;