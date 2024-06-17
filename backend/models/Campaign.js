const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  beneficiaryAddress: { type: String, required: true },
  askAmount: { type: Number, required: true },
  donated: { type: Number, required: true },
  spentAmount: { type: Number, required: true },
  creationDate: { type: Date, required: true },
  isActive: { type: Boolean, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  photo: { type: String, required: true },
  socialLinks: {
    twitter: String,
    facebook: String,
    instagram: String,
  },
  donations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Donation' }],
  withdrawals: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Withdrawal' }],
});

const Campaign = mongoose.model('Campaign', campaignSchema);

module.exports = Campaign;
