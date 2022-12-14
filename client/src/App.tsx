import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import "bootswatch/dist/cyborg/bootstrap.min.css";

// Pages
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import RegisterPage from "./pages/RegisterPage";

// Components
import NavbarComponent from "./components/NavbarComponent";
import AppProvider from "./context/AppProvider";

function App() {
  return (
    <AppProvider>
      <>
        <BrowserRouter>
          <NavbarComponent />

          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
          </Routes>
        </BrowserRouter>
        <Toaster />
      </>
    </AppProvider>
  );
}

export default App;
