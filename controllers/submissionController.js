const FormSubmission = require("../models/FormSubmission");
const User = require("../models/User");
const { sendEmail } = require("../services/smtpService");

const handleFormSubmission = async (req, res) => {
  const { apiKey } = req.params; // Retrieve API key from the URL parameter
  const { name, email, message } = req.body;

  try {
    // Validate API key and find user
    const user = await User.findOne({ apiKey });
    if (!user) {
      return res.status(401).json({ error: "Invalid API key" });
    }

    const submission = new FormSubmission({
      apiKey,
      email,
      message,
      ipAddress: req.ip,
    });
    await submission.save();

    // Send email notification to the user's registered email
    const emailContent = `New form submission:\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}`;
    await sendEmail(user.email, emailContent);

    res.status(200).json({ message: "Form submitted successfully" });
  } catch (error) {
    console.error("Error processing form submission:", error);
    res.status(500).json({ error: "Error processing the form submission" });
  }
};

module.exports = { handleFormSubmission };
