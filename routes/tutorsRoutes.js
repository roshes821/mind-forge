const express = require('express');
const router = express.Router();
const Tutor = require('../models/Tutor');

// Add a tutor
router.post('/add', async (req, res) => {
  try {
    const tutor = new Tutor(req.body);
    await tutor.save();
    res.status(201).json(tutor);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all tutors
router.get('/', async (req, res) => {
  try {
    const tutors = await Tutor.find();
    res.status(200).json(tutors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
