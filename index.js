
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
require('dotenv').config();

const app = express();

// Import Company model
const Company = require('./models/Company');

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB Atlas');
}).catch((error) => {
  console.error('MongoDB connection error:', error);
});

// Routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/companyform", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "company.html"));
});

app.get("/aboutme", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "about.html"));
});

// Handle company form submission
app.post("/submit-company", async (req, res) => {
  try {
    const {
      district,
      role,
      companyName,
      address,
      phone,
      whatsapp,
      openings,
      education
    } = req.body;

    // Create new company document
    const newCompany = new Company({
      district,
      role,
      companyName,
      address,
      phone,
      whatsapp,
      openings: parseInt(openings),
      education
    });

    // Save to MongoDB
    await newCompany.save();
    
    res.json({
      success: true,
      message: 'Company data saved successfully!',
      data: newCompany
    });
  } catch (error) {
    console.error('Error saving company data:', error);
    res.status(500).json({
      success: false,
      message: 'Error saving company data',
      error: error.message
    });
  }
});

// Get all companies (optional route to view stored data)
app.get("/api/companies", async (req, res) => {
  try {
    const companies = await Company.find().sort({ createdAt: -1 });
    res.json(companies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
