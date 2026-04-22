import { BanknoteArrowUp } from "lucide-react";
import { SquareCheckBig } from "lucide-react";
import { PiggyBankIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";
import { Dot } from "lucide-react";

import { useNavigate } from "react-router-dom";

import Button from "../components/button";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center text-white overflow-x-hidden">
      <header className="w-full fixed top-0 left-0 z-20 px-4 py-4 sm:px-8">
        <nav className="mx-auto max-w-6xl bg-black/20 backdrop-blur-md rounded-2xl px-4 py-3 sm:px-5 flex items-center justify-between border border-white/20 animate-slide-down">
          <h2 className="text-lg sm:text-2xl font-extrabold tracking-wide">
            <span>Money</span>
            <span className="text-accent-500">Tracker</span>
          </h2>

          <div className="flex items-center gap-3 sm:gap-5 text-xs sm:text-base font-medium">
            <a
              href="#about"
              className="hover:text-accent-400 transition-colors"
            >
              About
            </a>
            <a
              href="#contact"
              className="hover:text-accent-400 transition-colors"
            >
              Contact
            </a>
          </div>
        </nav>
      </header>
      <section className="min-h-screen w-full flex flex-col justify-center items-center bg-linear-to-b from-primary-600 to-primary-800 px-4 pt-28 pb-14 sm:pt-24 sm:pb-8">
        <div className="bg-white/25 backdrop-blur-xs rounded-4xl pr-2.5 mb-5 animate-fade-in-delay-4">
          <p className="text-xs font-semibold tracking-widest flex justify-center items-center">
            <Dot size={30} color="gold" />
            YOUR FINANCE TRACKER
          </p>
        </div>
        <h1 className="text-5xl text-center font-extrabold leading-tight sm:text-7xl animate-slide-up">
          <span>Money</span>
          <span className="text-accent-500">Tracker</span>
        </h1>
        <div className="w-full flex flex-col justify-center items-center gap-4 sm:gap-5 sm:flex-row mt-8 sm:mt-10 animate-slide-up-delay-1">
          <div className="w-full max-w-80 border border-white/20 bg-black/20 p-5 rounded-2xl">
            <h1 className="text-md font-semibold pb-2.5 flex items-center gap-2 sm:text-lg">
              <BanknoteArrowUp size={25} className="text-accent-500" />
              Track
            </h1>
            <p className="text-sm sm:text-base">
              Monitor your earnings, expenses and savings digitally on your
              phone or computer
            </p>
          </div>
          <div className="w-full max-w-80 border border-white/20 bg-black/20 p-5 rounded-2xl">
            <h1 className="text-md font-semibold pb-2.5 flex items-center gap-2 sm:text-lg">
              <PiggyBankIcon size={25} className="text-accent-500" />
              Save
            </h1>
            <p className="text-sm sm:text-base">
              Save money efficiently by tracking your expenses and planning on
              what to spend next
            </p>
          </div>
          <div className="w-full max-w-80 border border-white/20 bg-black/20 p-5 rounded-2xl">
            <h1 className="text-md font-semibold pb-2.5 flex items-center gap-2 sm:text-lg">
              <SquareCheckBig size={25} className="text-accent-500" />
              Achieve
            </h1>
            <p className="text-sm sm:text-base">
              Set and reach financial goals you've set to yourself and achieve
              those dreams
            </p>
          </div>
        </div>
        <Button
          title={
            <span className="flex items-center gap-2 justify-center">
              <ArrowRight size={25} />
              Get Started
            </span>
          }
          onClick={() => navigate("/login")}
          className="mt-10 py-4 px-20 bg-primary-500 hover:bg-primary-600 text-xl sm:text-2xl rounded-4xl animate-slide-up-delay-2"
        />
      </section>

      <div id="about" className="p-10 border">
        <h1>About</h1>
      </div>
      <div id="contact" className="p-10 border">
        Contact Section
      </div>

      <footer className="w-full h-full text-center border p-5">
        Footer Section
      </footer>
    </div>
  );
};

export default Landing;
