import { BanknoteArrowUp } from "lucide-react";
import { BanknoteArrowDown } from "lucide-react";
import { SquareCheckBig } from "lucide-react";

import Button from "../components/button";

const Landing = () => {
  return (
    <div className="flex flex-col justify-center items-center text-white">
      <div className="h-screen w-full flex flex-col justify-center items-center bg-linear-to-b from-primary-600 to-primary-800 px-4">
        <h1 className="text-4xl text-center font-extrabold sm:text-7xl animate-slide-up">
          <span>Money</span>
          <span className="text-accent-500">Tracker</span>
        </h1>
        <div className="flex flex-col gap-6 sm:gap-10 sm:flex-row mt-12 sm:mt-20 animate-slide-up-delay-1">
          <div className="border-2 border-primary-200 p-5 rounded-4xl bg-primary-900">
            <span className="flex gap-2.5 mb-2.5 text-2xl sm:text-3xl font-semibold">
              <BanknoteArrowUp size={35} />
              <h1>Earn</h1>
            </span>
            <p className="text-base sm:text-xl">Track your earnings</p>
          </div>
          <div className="border-2 border-primary-200 p-5 rounded-4xl bg-primary-900">
            <span className="flex gap-2.5 mb-2.5 text-2xl sm:text-3xl font-semibold">
              <BanknoteArrowDown size={35} />
              <h1>Spend</h1>
            </span>
            <p className="text-base sm:text-xl">Track your expenses</p>
          </div>
          <div className="border-2 border-primary-200 p-5 rounded-4xl bg-primary-900">
            <span className="flex gap-2.5 mb-2.5 text-2xl sm:text-3xl font-semibold">
              <SquareCheckBig size={35} />
              <h1>Achieve</h1>
            </span>
            <p className="text-base sm:text-xl">Achieve financial goals</p>
          </div>
        </div>
        <Button
          title={"Get Started"}
          className="mt-12 sm:mt-20 p-4 sm:p-5 bg-primary-500 hover:bg-primary-600 text-xl sm:text-3xl rounded-4xl animate-slide-up-delay-2"
        />
      </div>

      <div>About Section</div>
      <div>Contact Section</div>

      <footer className="w-full h-full text-center">Footer Section</footer>
    </div>
  );
};

export default Landing;
