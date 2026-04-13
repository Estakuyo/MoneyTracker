import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  BanknoteArrowDown,
  PiggyBank,
  HandCoins,
  Menu,
  ChevronLeft,
} from "lucide-react";

const Sidebar = () => {
  const location = useLocation();
  const [isCollapse, setIsCollapse] = useState(true);

  if (
    location.pathname === "/home" ||
    location.pathname === "/earnings" ||
    location.pathname === "/expenses" ||
    location.pathname === "/savings"
  ) {
    return (
      <>
        {/* Hamburger button - only visible on mobile */}
        <button
          onClick={() => setIsCollapse(false)}
          className={`md:hidden fixed top-4 left-4 z-10 text-white bg-primary-500 p-2 rounded-lg shadow-lg 
      hover:bg-success-500 transition-all duration-300 cursor-pointer ${isCollapse ? "opacity-100 visible" : "opacity-0 invisible"}`}
        >
          <Menu size={28} />
        </button>

        <div
          className={`fixed left-0 shadow-xl h-screen w-70 bg-primary-600 z-10 
          transition-transform duration-300 ease-in-out 
          ${isCollapse ? "-translate-x-full md:translate-x-0" : "translate-x-0"}`}
        >
          {/* Close button - only visible on mobile */}
          <button
            onClick={() => setIsCollapse(true)}
            className="md:hidden absolute top-4 right-4 text-white bg-primary-500 p-2 rounded-lg shadow-lg 
          hover:bg-success-500 transition cursor-pointer"
          >
            <ChevronLeft size={24} />
          </button>
          <h1 className="mt-30 mb-20 text-center title text-white">
            Money<span className="text-success-500">Tracker</span>
          </h1>
          <ul className="text-white">
            <Link to="/home">
              <li
                className={`sidebar-options ${location.pathname == "/home" ? "bg-accent-500" : ""}`}
                onClick={() => setIsCollapse(true)}
              >
                <Home />
                Home
              </li>
            </Link>
            <Link to="/earnings">
              <li
                className={`sidebar-options ${location.pathname == "/earnings" ? "bg-accent-500" : ""}`}
                onClick={() => setIsCollapse(true)}
              >
                <HandCoins />
                Earnings
              </li>
            </Link>
            <Link to="/expenses">
              <li
                className={`sidebar-options ${location.pathname == "/expenses" ? "bg-accent-500" : ""}`}
                onClick={() => setIsCollapse(true)}
              >
                <BanknoteArrowDown />
                Expenses
              </li>
            </Link>
            <Link to="/savings">
              <li
                className={`sidebar-options ${location.pathname == "/savings" ? "bg-accent-500" : ""}`}
                onClick={() => setIsCollapse(true)}
              >
                <PiggyBank />
                Savings
              </li>
            </Link>
          </ul>
          <button className="absolute bottom-0 left-0 right-0 w-4/5 mx-auto mb-10 button bg-red-600 text-white hover:bg-red-700">
            Logout
          </button>
        </div>
      </>
    );
  }

  return <></>;
};

export default Sidebar;
