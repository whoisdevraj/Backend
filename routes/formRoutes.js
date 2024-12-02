const express = require("express");
const router = express.Router();
const { handleFormSubmission } = require("../controllers/submissionController");

// Route with dynamic API key
router.post("/:apiKey/forms/submit", handleFormSubmission);

module.exports = router;
