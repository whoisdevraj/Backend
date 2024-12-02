const { sendEmail } = require("../services/smtpService.js");

const sendFormSubmission = async ({ email, message }) => {
  try {
    await sendEmail(email, message);
    console.log("Form submission email sent successfully");
  } catch (error) {
    console.error("Error sending form submission email:", error);
    throw error;
  }
};

module.exports = { sendFormSubmission };
