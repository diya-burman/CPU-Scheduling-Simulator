require('dotenv').config({ path: '../../.env' }); // Ensure your .env file is loaded
const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const mongoose = require('mongoose'); // Import Mongoose
const cors = require('cors');

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // Ensure JSON data is handled

// MongoDB Connection
const dbURI = process.env.MONGO_URI; // Use the connection string stored in .env
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => console.log('Connected to MongoDB Atlas!'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Define a Feedback Schema
const feedbackSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  cpuAlgorithm: { type: String, required: true },
  feedback: { type: String, required: true }
});

// Create Feedback model
const Feedback = mongoose.model('Feedback', feedbackSchema);

// Route: Submit Feedback
app.post("/submit-feedback", async (req, res) => {
  const { name, email, cpuAlgorithm, feedback } = req.body;
  console.log('Received Feedback Data:', req.body); // Log incoming data for debugging

  // Create a new feedback document
  const newFeedback = new Feedback({ name, email, cpuAlgorithm, feedback });

  try {
    // Save feedback to MongoDB
    const savedFeedback = await newFeedback.save();
    console.log('Feedback Saved to DB:', savedFeedback); // Log saved document

    // Set up Nodemailer to send feedback email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_USER, // Ensure email sender is correct
      to: 'diyaburman60@example.com', // Change to your email
      subject: 'New Feedback from CPU AlgoSched',
      text: `Name: ${name}\nEmail: ${email}\nCPU Algorithm: ${cpuAlgorithm}\nFeedback: ${feedback}`
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error); // Log email error
        return res.status(500).send('There was an error sending your feedback.');
      } else {
        console.log('Email sent successfully:', info.response); // Log email success
        res.status(201).send('Feedback submitted successfully!');
      }
    });
  } catch (err) {
    console.error('Error saving feedback:', err); // Log database save error
    res.status(500).send('There was an error saving your feedback.');
  }
});

// Start server
const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
