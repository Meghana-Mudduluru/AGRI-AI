// routes/contact.js
const express = require('express');
const Contact = require('../models/Contact'); // Import the Contact model

const router = express.Router();

// Route to handle the contact form submission
router.post('/contact', async (req, res) => {
  const { name, email, message } = req.body;

  // Validate the contact form data
  if (!name || !email || !message) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Create a new contact document
    const newContact = new Contact({ name, email, message });

    // Save it to the database
    await newContact.save();
    res.status(201).json({ success: true, message: 'Contact form submitted successfully' });

  } catch (error) {
    console.error('❌ Error saving contact:', error);
    res.status(500).json({ message: 'Error saving contact form data' });
  }
});

module.exports = router;
