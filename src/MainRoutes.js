import React, { useEffect, useState } from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import { auth } from "./Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Sidebar from "./Sidebar";
import CreateMeso from "./CreateMeso";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import CurrentDay from "./CurrentDay";
import MesoList from "./MesoList";
import { getUserLogoPreference, saveUserLogoPreference, defaultLogo } from './FirebaseFunctions';
import LogoSelectModal from './LogoSelectModal';

const MainRoutes = () => {
  const [user] = useAuthState(auth);
  const location = useLocation();
  const [selectedLogo, setSelectedLogo] = useState(defaultLogo);
  const shouldRenderSidebar = user && !["/signin", "/signup"].includes(location.pathname);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (user) {
        getUserLogoPreference(user.uid)
            .then(logoPreference => setSelectedLogo(logoPreference))
            .catch(error => console.error("Error fetching logo preference:", error));
    }
  }, [user]);

  const handleLogoSelection = (selectedLogo, userId) => {
    setSelectedLogo(selectedLogo);
    saveUserLogoPreference(userId, selectedLogo)
        .catch(error => console.error("Error saving logo preference:", error));
  }

  const handleLogoOpen = () => {
    setIsModalOpen(true);
  };
  
  const handleLogoClose = () => {
    setIsModalOpen(false);
  };
  
  const handleLogoSelect = (selectedLogo) => {
    if (user) {
      handleLogoSelection(selectedLogo, user.uid);
    }
    handleLogoClose();
  };

  return (
    <>
      {shouldRenderSidebar && <Sidebar logo={selectedLogo} onLogoClick={handleLogoOpen} />}
      <LogoSelectModal isOpen={isModalOpen} onSelect={handleLogoSelect} />
      <Routes>
        <Route path="/signin" element={user ? <Navigate to="/mesocycles" /> : <SignInForm logo={selectedLogo} onLogoClick={handleLogoOpen} />} />
        <Route path="/signup" element={<SignUpForm logo={selectedLogo} onLogoClick={handleLogoOpen} />} />
        <Route path="/newmeso" element={user ? <CreateMeso /> : <Navigate to="/signin" />} />
        <Route path="/today" element={user ? <CurrentDay userId={user.uid} /> : <Navigate to="/signin" />} />
        <Route path="/mesocycles" element={user ? <MesoList userId={user.uid} /> : <Navigate to="/signin" />} />
        <Route path="/*" element={<Navigate to="/mesocycles" />} />
      </Routes>
    </>
  );
}

export default MainRoutes;