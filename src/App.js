import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WorkoutForm from "./WorkoutForm";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signin" element={<SignInForm />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/workout" element={<WorkoutForm />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;