import { Routes, Route } from "react-router-dom";
import "./App.css";

// Pages
import LandingPage from "./pages/landingPage";
import LoginRegisterPage from "./pages/loginRegisterPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/loginRegister" element={<LoginRegisterPage />} />
      </Routes>
    </>
  );
}

export default App;
