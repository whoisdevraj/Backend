const mongoose = require("mongoose");
const { Schema } = mongoose;

const formSubmissionSchema = new Schema({
  apiKey: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  submittedAt: { type: Date, default: Date.now },
  ipAddress: { type: String },
});

module.exports = mongoose.model("FormSubmission", formSubmissionSchema);
