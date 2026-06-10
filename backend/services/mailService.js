const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

const escapeHtml = (value = "") => {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

const sendContactEmail = async ({ fromEmail, message }) => {
  const safeEmail = escapeHtml(fromEmail);
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br />");

  return transporter.sendMail({
    from: `MoneyTracker Contact <${process.env.GMAIL_USER}>`,
    to: process.env.GMAIL_USER,
    subject: "MoneyTracker User Message",
    replyTo: fromEmail,
    text: `From: ${fromEmail}\n\nMessage:\n${message}`,
    html: `
      <h2>New MoneyTracker User Message</h2>
      <p><strong>From:</strong> ${safeEmail}</p>
      <p><strong>Message:</strong></p>
      <p>${safeMessage}</p>
    `,
  });
};

module.exports = { sendContactEmail };
