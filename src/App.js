import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import MainRoutes from "./MainRoutes";

const App = () => {
  return (
    <div>
      <Router>
        <MainRoutes />
      </Router>
    </div>
  );
}

export default App;