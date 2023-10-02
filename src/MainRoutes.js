import React from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import { auth } from "./Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Sidebar from "./Sidebar";
import CreateMeso from "./CreateMeso";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import CurrentDay from "./CurrentDay";
import MesoList from "./MesoList";

const MainRoutes = () => {
  const [user] = useAuthState(auth);
  const location = useLocation();
  
  const shouldRenderSidebar = user && !["/signin", "/signup"].includes(location.pathname);

  return (
    <>
      {shouldRenderSidebar && <Sidebar />}
      <Routes>
        <Route path="/signin" element={user ? <Navigate to="/mesocycles" /> : <SignInForm />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/newmeso" element={user ? <CreateMeso /> : <Navigate to="/signin" />} />
        <Route path="/today" element={user ? <CurrentDay userId={user.uid} /> : <Navigate to="/signin" />} />
        <Route path="/mesocycles" element={user ? <MesoList userId={user.uid} /> : <Navigate to="/signin" />} />
        <Route path="/*" element={<Navigate to="/mesocycles" />} />
      </Routes>
    </>
  );
}

export default MainRoutes;