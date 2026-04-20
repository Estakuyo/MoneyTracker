import { BanknoteArrowUp } from "lucide-react";
import { BanknoteArrowDown } from "lucide-react";
import { SquareCheckBig } from "lucide-react";
import { Dot } from "lucide-react";

import Button from "../components/button";

const Landing = () => {
  return (
    <div className="flex flex-col justify-center items-center text-white">
      <div className="h-screen w-full flex flex-col justify-center items-center bg-linear-to-b from-primary-600 to-primary-800 px-4">
        <div className="bg-white/25 backdrop-blur-xs rounded-4xl pr-2.5 mb-5">
          <p className="text-xs font-semibold tracking-widest flex justify-center items-center">
            <Dot size={30} color="gold" />
            YOUR FINANCE TRACKER
          </p>
        </div>
        <h1 className="text-4xl text-center font-extrabold sm:text-7xl animate-slide-up">
          <span>Money</span>
          <span className="text-accent-500">Tracker</span>
        </h1>
        <Button
          title={"Get Started"}
          className="mt-10 p-4 sm:p-5 bg-primary-500 hover:bg-primary-600 text-xl sm:text-2xl rounded-4xl animate-slide-up-delay-2"
        />
      </div>

      <div>About Section</div>
      <div>Contact Section</div>

      <footer className="w-full h-full text-center">Footer Section</footer>
    </div>
  );
};

export default Landing;
