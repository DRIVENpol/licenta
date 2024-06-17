const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const Campaign = require('./models/Campaign');
const Donation = require('./models/Donation');
const Withdrawal = require('./models/Withdrawal');

const app = express();
const PORT = 3001;

app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb+srv://yourweb3cto:95bHaYPw9CWcPqUs@cluster0.zbyphij.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.post('/campaigns', async (req, res) => {
  try {
    const { id, beneficiaryAddress, askAmount, name, description, photo, twitter, facebook, instagram } = req.body;

    const campaign = new Campaign({
      id,
      beneficiaryAddress,
      askAmount,
      donated: 0,
      spentAmount: 0,
      creationDate: new Date(),
      isActive: true,
      name,
      description,
      photo,
      socialLinks: {
        twitter,
        facebook,
        instagram,
      }
    });

    await campaign.save();
    res.status(201).send(campaign);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get('/campaigns', async (req, res) => {
  try {
    const campaigns = await Campaign.find();
    res.status(200).json(campaigns);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get('/campaigns/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const campaign = await Campaign.findOne({ id }).populate('donations').populate('withdrawals');
    if (!campaign) {
      return res.status(404).send({ error: 'Campaign not found' });
    }
    res.status(200).send(campaign);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.post('/campaigns/:id/donations', async (req, res) => {
  try {
    const { id } = req.params;
    const { donor, amount, description } = req.body;

    if (!donor || !amount || !description) {
      return res.status(400).send({ error: 'Donor, amount, and description are required.' });
    }

    const donation = new Donation({
      donor,
      amount: parseFloat(amount), 
      description,
      campaign: id,
    });

    await donation.save();

    const campaign = await Campaign.findOne({ id });
    campaign.donated += parseFloat(amount); 
    campaign.donations.push(donation._id);
    await campaign.save();

    res.status(201).send(donation);
  } catch (error) {
    console.error('Error creating donation:', error);
    res.status(400).send(error);
  }
});

app.get('/campaigns/:id/donations', async (req, res) => {
  try {
    const { id } = req.params;
    const donations = await Donation.find({ campaign: id });
    res.status(200).send(donations);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.post('/campaigns/:id/withdrawals', async (req, res) => {
  try {
    const { id } = req.params;
    const { recipient, amount, description } = req.body; 

    if (!recipient || !amount || !description) {
      return res.status(400).send({ error: 'Recipient, amount, and description are required.' });
    }

    const withdrawal = new Withdrawal({
      recipient,
      amount: parseFloat(amount),
      description,
      campaign: id
    });

    await withdrawal.save();

    const campaign = await Campaign.findOne({ id });
    campaign.spentAmount += parseFloat(amount);
    campaign.withdrawals.push(withdrawal._id);
    await campaign.save();

    res.status(201).send(withdrawal);
  } catch (error) {
    console.error('Error creating withdrawal:', error);
    res.status(400).send(error);
  }
});

app.get('/campaigns/:id/withdrawals', async (req, res) => {
  try {
    const { id } = req.params;
    const withdrawals = await Withdrawal.find({ campaign: id });
    res.status(200).send(withdrawals);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
