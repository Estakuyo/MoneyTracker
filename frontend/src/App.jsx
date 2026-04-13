import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/authContext";
import { ModalProvider } from "./context/modalContext";

// Pages
import Landing from "./pages/landing";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import Home from "./pages/home";
import Expenses from "./pages/expenses";
import Savings from "./pages/savings";
import Earnings from "./pages/earnings";
import Sidebar from "./components/sidebar";

function App() {
  return (
    <>
      <AuthProvider>
        <ModalProvider>
          <Sidebar />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="/home" element={<Home />} />
            <Route path="/expenses" element={<Expenses />} />
            <Route path="/savings" element={<Savings />} />
            <Route path="/earnings" element={<Earnings />} />
          </Routes>
        </ModalProvider>
      </AuthProvider>
    </>
  );
}

export default App;
