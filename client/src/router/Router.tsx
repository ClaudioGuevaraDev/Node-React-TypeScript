import axios from "axios";

import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Pages
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import DashboardPage from "../pages/DashboardPage";

// Components
import NavbarComponent from "../components/NavbarComponent";

function Router() {
  const [logged, setLogged] = useState(false);

  const checkUserLogged = async () => {
    try {
      const { data } = await axios.get("/api/auth/check-user-logged");
      setLogged(data.logged);
    } catch (error) {
      setLogged(false);
    }
  };

  useEffect(() => {
    checkUserLogged();
  }, []);

  return (
    <BrowserRouter>
      <NavbarComponent />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/login"
          element={logged ? <Navigate to="/dashboard" /> : <LoginPage />}
        />
        <Route
          path="/register"
          element={logged ? <Navigate to="/dashboard" /> : <RegisterPage />}
        />
        <Route
          path="/dashboard"
          element={logged ? <DashboardPage /> : <Navigate to="/login" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
