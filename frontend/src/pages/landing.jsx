import { BanknoteArrowUp } from "lucide-react";
import { SquareCheckBig } from "lucide-react";
import { PiggyBankIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";
import { Dot } from "lucide-react";

import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/authContext";

import Button from "../components/button";

const Landing = () => {
  const { token } = useContext(UserContext);
  const navigate = useNavigate();

  const handleRedirect = () => {
    if (token) {
      navigate("/home");
    } else {
      navigate("/login");
    }
  };

  const scrollToSection = (event, sectionId) => {
    event.preventDefault();

    const section = document.getElementById(sectionId);
    if (!section) return;

    section.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

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
              onClick={(event) => scrollToSection(event, "about")}
              className="hover:text-accent-400 transition-colors"
            >
              About
            </a>
            <a
              href="#contact"
              onClick={(event) => scrollToSection(event, "contact")}
              className="hover:text-accent-400 transition-colors"
            >
              Contact
            </a>
          </div>
        </nav>
      </header>
      <section className="min-h-screen w-full flex flex-col justify-center items-center bg-linear-to-b from-primary-600 to-primary-800 px-4 pt-28 pb-14">
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
          onClick={handleRedirect}
          className="mt-10 py-4 px-20 bg-primary-500 hover:bg-primary-600 text-xl sm:text-2xl rounded-4xl animate-slide-up-delay-2"
        />
      </section>

      <div
        id="about"
        className="p-10 flex flex-col items-center gap-2.5 text-center border border-white/20 bg-black/20 rounded-2xl max-w-5xl sm:w-full mx-5 -mt-7 mb-10 animate-slide-up"
      >
        <h1 className="text-2xl font-semibold sm:text-4xl">About</h1>
        <p className="text-base sm:text-lg">
          MoneyTracker was created because of my bad spending habits, I was
          losing track on where I spend my money. So because of that I started
          searching for finance tracking app or web systems that will help me.
          Almost all of that I found were either too limited or required payment
          to access useful features. Then after all that, I said to myself why
          not just build my own.
        </p>
      </div>

      <div
        id="contact"
        className="p-10 flex flex-col items-center gap-2.5 text-center border border-white/20 bg-black/20 rounded-2xl max-w-5xl sm:w-full mx-5 mb-20 animate-slide-up"
      >
        <h1 className="text-2xl font-semibold sm:text-4xl">Contact</h1>
        <p className="text-base sm:text-lg">
          Have feedback or questions? Send a message and I will get back to you.
        </p>

        <form className="w-full max-w-3xl mt-3 flex flex-col gap-4 text-left">
          <div className="flex flex-col gap-2">
            <label htmlFor="contact-email" className="text-base sm:text-lg">
              Email
            </label>
            <input
              id="contact-email"
              type="email"
              placeholder="you@example.com"
              className="w-full rounded-xl border border-white/25 bg-black/30 px-4 py-3 text-base sm:text-lg text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-accent-500"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="contact-body" className="text-base sm:text-lg">
              Message
            </label>
            <textarea
              id="contact-body"
              rows={6}
              placeholder="Write your message here..."
              className="w-full rounded-xl border border-white/25 bg-black/30 px-4 py-3 text-base sm:text-lg text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-accent-500 resize-y"
            />
          </div>

          <Button
            title="Send Message"
            className="mt-2 py-3 px-8 bg-primary-500 hover:bg-primary-600 text-lg sm:text-xl rounded-3xl self-center"
          />
        </form>
      </div>

      <footer className="w-full border-t-2 border-t-accent-500 bg-black/30 p-5 text-center">
        <p className="text-base sm:text-lg text-white/80">
          Created by Estakuyo
        </p>
        <span className="flex justify-center items-center">
          <a
            href="https://johnmartineustaquio.vercel.app"
            target="_blank"
            rel="noreferrer"
            className="text-base sm:text-lg text-accent-400 hover:text-accent-300 transition-colors"
          >
            johnmartineustaquio.vercel.app
          </a>
          <Dot color="#1faa59" />
          <a
            href="https://linkedin.com/in/johnmartineustaquio"
            target="_blank"
            rel="noreferrer"
            className="text-base sm:text-lg text-accent-400 hover:text-accent-300 transition-colors"
          >
            linkedin.com/in/johnmartineustaquio
          </a>
        </span>
      </footer>
    </div>
  );
};

export default Landing;
