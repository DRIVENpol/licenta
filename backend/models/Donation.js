const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  donor: { type: String, required: true },
  amount: { type: Number, required: true },
  description: { type: String, required: true },
  date: { type: Date, default: Date.now },
  campaign: { type: String, required: true },
});

const Donation = mongoose.model('Donation', donationSchema);

module.exports = Donation;
