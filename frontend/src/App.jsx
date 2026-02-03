import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/authContext";
import "./App.css";

// Pages
import LandingPage from "./pages/landingPage";
import LoginRegisterPage from "./pages/loginRegisterPage";

function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/loginRegister" element={<LoginRegisterPage />} />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
