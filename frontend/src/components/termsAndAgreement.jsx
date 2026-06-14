const TermsAndAgreement = () => {
  return (
    <div className="text-sm text-gray-700 space-y-4">
      <p className="text-xs text-gray-500 italic">Last updated: June 2026</p>

      <section>
        <h2 className="font-semibold text-primary-700 mb-1">1. Introduction</h2>
        <p>
          Welcome to MoneyTracker. By creating an account, you agree to these
          Terms and Agreement. Please read them carefully before registering.
        </p>
      </section>

      <section>
        <h2 className="font-semibold text-primary-700 mb-1">
          2. Data We Collect
        </h2>
        <p>When you register, we collect the following information:</p>
        <ul className="list-disc list-inside mt-1 space-y-1 text-gray-600">
          <li>Your email address</li>
          <li>Your chosen username</li>
          <li>Your encrypted password</li>
        </ul>
      </section>

      <section>
        <h2 className="font-semibold text-primary-700 mb-1">
          3. How We Use Your Email
        </h2>
        <p>
          Your email address is collected solely for the purpose of account
          identification and, if needed, account recovery. We commit to the
          following:
        </p>
        <ul className="list-disc list-inside mt-2 space-y-1 text-gray-600">
          <li>
            We will <strong>never</strong> sell, rent, or share your email with
            third parties.
          </li>
          <li>
            We will <strong>never</strong> use your email for marketing,
            newsletters, or promotional content without your explicit consent.
          </li>
          <li>
            We will <strong>never</strong> leak or expose your email to
            unauthorized parties.
          </li>
          <li>
            Your email is stored securely and used only for core account
            functions.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="font-semibold text-primary-700 mb-1">
          4. Data Security
        </h2>
        <p>
          We take your privacy seriously. Your data is stored securely, and we
          follow industry-standard practices to protect your information from
          unauthorized access, disclosure, alteration, or destruction. Passwords
          are hashed and never stored in plain text.
        </p>
      </section>

      <section>
        <h2 className="font-semibold text-primary-700 mb-1">5. Your Rights</h2>
        <p>You have the right to:</p>
        <ul className="list-disc list-inside mt-1 space-y-1 text-gray-600">
          <li>
            Request deletion of your account and associated data at any time.
          </li>
          <li>Request a copy of the data we hold about you.</li>
          <li>Update or correct your account information.</li>
        </ul>
      </section>

      <section>
        <h2 className="font-semibold text-primary-700 mb-1">
          6. User Responsibilities
        </h2>
        <p>
          By using MoneyTracker, you agree to provide accurate information
          during registration and to keep your login credentials confidential.
          You are responsible for all activity that occurs under your account.
        </p>
      </section>

      <section>
        <h2 className="font-semibold text-primary-700 mb-1">
          7. Changes to These Terms
        </h2>
        <p>
          We reserve the right to update these terms at any time. Continued use
          of MoneyTracker after changes are posted constitutes your acceptance
          of the revised terms.
        </p>
      </section>
    </div>
  );
};

export default TermsAndAgreement;
