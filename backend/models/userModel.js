
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  otp: { type: String },
  otpVerified: { type: Boolean, default: false },
  sites: [{ name: String, url: String }]
});

module.exports = mongoose.model("User", userSchema);