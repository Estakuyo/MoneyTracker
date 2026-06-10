const { sendContactEmail } = require("../services/mailService");

const isValidEmail = (email = "") => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const sendContactMessage = async (req, res) => {
  try {
    const { email, message } = req.body;

    if (!email || !message) {
      return res.status(400).json({ error: "Email and message are required" });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ error: "Please provide a valid email" });
    }

    if (message.trim().length < 5) {
      return res.status(400).json({ error: "Message is too short" });
    }

    await sendContactEmail({
      fromEmail: email.trim(),
      message: message.trim(),
    });

    return res
      .status(200)
      .json({ message: "Message sent successfully. Thank you!" });
  } catch (error) {
    return res.status(500).json({ error: "Failed to send message" });
  }
};

module.exports = { sendContactMessage };
