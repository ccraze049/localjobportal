
const express = require("express");
const { Pool } = require("pg");
const bodyParser = require("body-parser");
const path = require("path");
const { default: mongoose } = require("mongoose");
const Company = require("./models/Company");

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));

mongoose.connect("mongodb+srv://ccraze049:G6WM0aBf7fII38C6@job.1jij73n.mongodb.net/?retryWrites=true&w=majority&appName=job").then(() => {
  console.log("Connected to MongoDB");
})

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

app.get("/experience", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/companies", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "comanydata.html"));
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
      education,
    } = req.body;

    const company = new Company({
      district,
      role,
      companyName,
      address,
      phone,
      whatsapp,
      openings,
      education,
    });

    const savedCompany = await company.save();

    res.json({
      success: true,
      message: "Company data saved successfully!",
      data: savedCompany,
    });

  } catch (error) {
    console.error("Error saving company data:", error);
    res.status(500).json({
      success: false,
      message: "Error saving company data",
      error: error.message,
    });
  }
});


// Get all companies
app.get("/api/companies", async (req, res) => {
  try {
    const companies = await Company.find().sort({ createdAt: -1 });
    res.json(companies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});
