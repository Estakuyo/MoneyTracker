import { BanknoteArrowUp } from "lucide-react";
import { SquareCheckBig } from "lucide-react";
import { PiggyBankIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";
import { Dot } from "lucide-react";

import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../context/authContext";
import { sendContactMessage } from "../services/contact";

import Button from "../components/button";
import Modal from "../components/modal";
import TermsAndAgreement from "../components/termsAndAgreement";

const Landing = () => {
  const { token } = useContext(UserContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [contactFeedback, setContactFeedback] = useState({
    type: "",
    text: "",
  });
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);

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

  const handleContactSubmit = async (event) => {
    event.preventDefault();

    if (!email.trim() || !message.trim()) {
      setContactFeedback({
        type: "error",
        text: "Please provide your email and message.",
      });
      return;
    }

    try {
      setIsSubmitting(true);
      setContactFeedback({ type: "", text: "" });

      const data = await sendContactMessage({
        email: email.trim(),
        message: message.trim(),
      });

      setContactFeedback({
        type: "success",
        text: data?.message || "Message sent successfully.",
      });
      setEmail("");
      setMessage("");
    } catch (error) {
      setContactFeedback({
        type: "error",
        text: error.message || "Failed to send message.",
      });
    } finally {
      setIsSubmitting(false);
    }
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

        <form
          onSubmit={handleContactSubmit}
          className="w-full max-w-3xl mt-3 flex flex-col gap-4 text-left"
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="contact-email" className="text-base sm:text-lg">
              Email
            </label>
            <input
              id="contact-email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
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
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              className="w-full rounded-xl border border-white/25 bg-black/30 px-4 py-3 text-base sm:text-lg text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-accent-500 resize-y"
            />
          </div>

          {contactFeedback.text ? (
            <p
              className={`text-sm sm:text-base text-center ${
                contactFeedback.type === "error"
                  ? "text-error-300"
                  : "text-primary-300"
              }`}
            >
              {contactFeedback.text}
            </p>
          ) : null}

          <Button
            type="submit"
            title={isSubmitting ? "Sending..." : "Send Message"}
            disabled={isSubmitting}
            className="mt-2 py-3 px-8 bg-primary-500 hover:bg-primary-600 disabled:opacity-60 disabled:cursor-not-allowed text-lg sm:text-xl rounded-3xl self-center"
          />
        </form>
      </div>

      <footer className="w-full border-t-2 border-t-accent-500 bg-black/30 p-5 text-center">
        <p className="text-base sm:text-lg text-white/80">
          Created by Estakuyo
        </p>
        <span className="flex flex-col justify-center items-center sm:flex-row">
          <a
            href="https://johnmartineustaquio.vercel.app"
            target="_blank"
            rel="noreferrer"
            className="text-base sm:text-lg text-accent-400 hover:text-accent-300 transition-colors"
          >
            johnmartineustaquio.vercel.app
          </a>
          <Dot color="#1faa59" className="hidden sm:block" />
          <a
            href="https://linkedin.com/in/johnmartineustaquio"
            target="_blank"
            rel="noreferrer"
            className="text-base sm:text-lg text-accent-400 hover:text-accent-300 transition-colors"
          >
            linkedin.com/in/johnmartineustaquio
          </a>
        </span>
        <button
          type="button"
          onClick={() => setIsTermsModalOpen(true)}
          className="mt-2 text-sm text-white/50 hover:text-accent-400 hover:underline transition-colors cursor-pointer"
        >
          Terms and Agreement
        </button>
      </footer>

      {/* Terms & Agreement Modal */}
      <Modal
        isOpen={isTermsModalOpen}
        onClose={() => setIsTermsModalOpen(false)}
        title="Terms and Agreement"
      >
        <TermsAndAgreement />
        <div className="mt-6 flex justify-end border-t border-gray-200 pt-4">
          <button
            type="button"
            onClick={() => setIsTermsModalOpen(false)}
            className="px-4 py-2 text-sm rounded-md border border-gray-300 text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Landing;
