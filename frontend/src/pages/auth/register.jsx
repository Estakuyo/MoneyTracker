import { UserContext } from "../../context/authContext";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

import { validators } from "../../utils/validators";
import { useFormErrors } from "../../hooks/useFormError";

import Modal from "../../components/Modal";
import TermsAndAgreement from "../../components/termsAndAgreement";

const Register = () => {
  const { register } = useContext(UserContext);
  const navigate = useNavigate();
  const { errors, setError, clearError, clearAllErrors } = useFormErrors();

  // Inputs
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Terms modal
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    // Validate
    const emailError = validators.email(email);
    const usernameError = validators.username(username);
    const passwordError = validators.password(password);
    const confirmError = validators.confirmPassword(confirmPassword, password);

    setError("email", emailError);
    setError("username", usernameError);
    setError("password", passwordError);
    setError("confirmPassword", confirmError);

    if (!agreedToTerms) {
      setError("terms", "You must agree to the Terms and Agreement.");
      return;
    }

    if (emailError) {
      setEmail("");
      return;
    }
    if (usernameError) {
      setUsername("");
      return;
    }
    if (passwordError) {
      setPassword("");
      return;
    }
    if (confirmError) {
      setConfirmPassword("");
      return;
    }

    try {
      await register({ email, username, password });
      navigate("/login");
    } catch (error) {
      setError(
        "general",
        error.message
          ? "Account Already Exists"
          : "Registration Failed. Try Again.",
      );
      setEmail("");
      setUsername("");
      setPassword("");
      setConfirmPassword("");
    }
  };

  return (
    <div className="h-screen w-full flex justify-center items-center">
      <form
        onSubmit={handleRegister}
        className="auth-form backdrop-blur-sm bg-primary-600/90 animate-slide-up"
      >
        <h1 className="auth-header text-white mb-2 animate-fade-in-delay-1">
          Create Account
        </h1>
        <p className="text-center text-primary-100 text-sm mb-4 animate-fade-in-delay-1">
          Join MoneyTracker today
        </p>
        {errors.general && (
          <p className="text-red-500 text-sm p-2 bg-error-200/75 rounded w-fit mx-auto">
            {errors.general}
          </p>
        )}

        <label className="flex flex-col gap-2 animate-fade-in-delay-2">
          <span className="text-sm font-medium text-primary-50">Email</span>
          <input
            name="email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              clearError("email");
            }}
            placeholder={errors.email ? errors.email : "Enter your email"}
            className={`input-field bg-white/95 text-gray-800 placeholder:text-gray-400 ${
              errors.email
                ? "border-2 border-error-400 placeholder:text-red-500 placeholder:text-xs"
                : ""
            }`}
          />
        </label>

        <label className="flex flex-col gap-2 animate-fade-in-delay-2">
          <span className="text-sm font-medium text-primary-50">Username</span>
          <input
            name="username"
            type="text"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              clearError("username");
            }}
            placeholder={
              errors.username ? errors.username : "Choose a username"
            }
            className={`input-field bg-white/95 text-gray-800 placeholder:text-gray-400 ${
              errors.username
                ? "border-2 border-error-400 placeholder:text-red-500 placeholder:text-xs"
                : ""
            }`}
          />
        </label>

        <label className="flex flex-col gap-2 animate-fade-in-delay-3">
          <span className="text-sm font-medium text-primary-50">Password</span>
          <div className="relative">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                clearError("password");
              }}
              placeholder={
                errors.password ? errors.password : "Create a password"
              }
              className={`input-field pr-11 bg-white/95 text-gray-800 placeholder:text-gray-400 ${
                errors.password
                  ? "border-2 border-error-400 placeholder:text-red-500 placeholder:text-xs"
                  : ""
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute inset-y-0 right-0 flex w-10 items-center justify-center text-gray-500 transition-colors hover:text-gray-700"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
        </label>

        <label className="flex flex-col gap-2 animate-fade-in-delay-3">
          <span className="text-sm font-medium text-primary-50">
            Confirm Password
          </span>
          <div className="relative">
            <input
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                clearError("confirmPassword");
              }}
              placeholder={
                errors.confirmPassword
                  ? errors.confirmPassword
                  : "Confirm your password"
              }
              className={`input-field pr-11 bg-white/95 text-gray-800 placeholder:text-gray-400 ${
                errors.confirmPassword
                  ? "border-2 border-error-400 placeholder:text-red-500 placeholder:text-xs"
                  : ""
              }`}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              aria-label={
                showConfirmPassword
                  ? "Hide confirm password"
                  : "Show confirm password"
              }
              className="absolute inset-y-0 right-0 flex w-10 items-center justify-center text-gray-500 transition-colors hover:text-gray-700"
            >
              {showConfirmPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
        </label>

        {/* Terms checkbox */}
        <div className="flex flex-col gap-1">
          <label className="flex items-center gap-1.5 text-sm text-primary-100 cursor-pointer">
            <input
              type="checkbox"
              checked={agreedToTerms}
              onChange={(e) => {
                setAgreedToTerms(e.target.checked);
                if (e.target.checked) clearError("terms");
              }}
              className="cursor-pointer"
            />
            I agree to the{" "}
            <button
              type="button"
              onClick={() => setIsTermsModalOpen(true)}
              className="text-accent-400 hover:text-accent-300 hover:underline font-semibold transition-colors cursor-pointer"
            >
              Terms and Agreement
            </button>
          </label>
          {errors.terms && (
            <p className="text-red-400 text-xs pl-0.5">{errors.terms}</p>
          )}
        </div>

        <button type="submit" className="auth-btn animate-fade-in-delay-4">
          Create Account
        </button>

        <div className="text-center text-primary-100 text-sm border-t border-primary-400/30 pt-4 animate-fade-in-delay-4">
          Already have an account?{" "}
          <a
            href="/login"
            className="font-semibold text-accent-400 hover:text-accent-300 hover:underline transition-colors"
          >
            Sign In
          </a>
        </div>
      </form>

      {/* Terms & Agreement Modal */}
      <Modal
        title="Terms and Agreement"
        isOpen={isTermsModalOpen}
        onClose={() => setIsTermsModalOpen(false)}
      >
        <TermsAndAgreement />
        <div className="mt-6 flex justify-end gap-3 border-t border-gray-200 pt-4">
          <button
            type="button"
            onClick={() => setIsTermsModalOpen(false)}
            className="px-4 py-2 text-sm rounded-md border border-gray-300 text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
          >
            Close
          </button>
          <button
            type="button"
            onClick={() => {
              setAgreedToTerms(true);
              clearError("terms");
              setIsTermsModalOpen(false);
            }}
            className="px-4 py-2 text-sm rounded-md bg-primary-600 text-white hover:bg-primary-700 transition-colors cursor-pointer"
          >
            I Agree
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Register;
