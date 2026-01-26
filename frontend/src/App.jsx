import { Routes, Route } from "react-router-dom";
import "./App.css";

// Pages
import LandingPage from "./pages/landingPage";
import RegisterPage from "./pages/registerPage";
import LoginPage from "./pages/loginPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/Register" element={<RegisterPage />} />
        <Route path="/Login" element={<LoginPage />} />
      </Routes>
    </>
  );
}

export default App;
