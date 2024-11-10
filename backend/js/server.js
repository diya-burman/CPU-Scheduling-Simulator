const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/submit-feedback", async (req, res) => {
  const { name, email, cpuAlgorithm, feedback } = req.body;

  require('dotenv').config();
  // Set up nodemailer
  const transporter = nodemailer.createTransport({
    service: "gmail", // Example with Gmail
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: email,
    to: "vasu.tan2017@gmail.com", // Replace with the email where feedback should go
    subject: "New Feedback from CPU Scheduler",
    text: `Name: ${name}\nEmail: ${email}\nCPU Algorithm: ${cpuAlgorithm}\nFeedback: ${feedback}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send("There was an error sending your feedback. Please try again later.");
    } else {
      console.log("Email sent: " + info.response);
      res.send("Feedback submitted successfully!");
    }
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
