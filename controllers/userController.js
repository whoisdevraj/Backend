const User = require("../models/User.js");
const { sendEmail } = require("../services/smtpService.js");
const { generateApiKey } = require("../utils/apiKeyGenerator.js");

const registerUser = async (req, res) => {
  const { email } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: "Email is already registered" });
    }

    const apiKey = generateApiKey();

    user = new User({ email, apiKey });
    await user.save();

    await sendEmail(email, `Your API key: ${apiKey}`);

    res.status(201).json({
      message: "User registered successfully. API key sent to your email.",
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Error registering user" });
  }
};

module.exports = { registerUser };
