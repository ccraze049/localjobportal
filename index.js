const express = require("express");
const { Pool } = require("pg");
const bodyParser = require("body-parser");
const path = require("path");
const { default: mongoose } = require("mongoose");
const Company = require("./models/Company");
const Feedback = require("./models/Feedback");

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));

mongoose
  .connect(
    "mongodb+srv://ccraze049:G6WM0aBf7fII38C6@job.1jij73n.mongodb.net/?retryWrites=true&w=majority&appName=job",
  )
  .then(() => {
    console.log("Connected to MongoDB");
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

app.get("/experience", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/companies", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "comanydata.html"));
});

app.get("/company-details", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "company-details.html"));
});

app.get("/company-management", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "company-management.html"));
});

app.get("/delete-success", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "delete-success.html"));
});

app.get("/company-not-found", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "company-not-found.html"));
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
    console.log("Company saved successfully:", savedCompany);

    res.sendFile(path.join(__dirname, "public", "msg.html"));
  } catch (error) {
    console.error("Error saving company data:", error);
    res.status(500).json({ error: "Failed to save company data" });
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

app.get("/api/companies/filter", async (req, res) => {
  const { district, education } = req.query;
  try {
    const filterCriteria = {};
    if (district) filterCriteria.district = district;
    if (education) filterCriteria.education = education;

    const companies = await Company.find(filterCriteria).sort({
      createdAt: -1,
    });

    // Log the filtered companies array to debug
    console.log("Filtered Companies:", companies);

    res.json(companies);
  } catch (error) {
    console.error("Error fetching filtered companies:", error);
    res.status(500).json({ error: error.message });
  }
});

// Search for specific company by name and district
app.get("/api/company-details", async (req, res) => {
  const { companyName, district } = req.query;
  try {
    const company = await Company.findOne({
      companyName: { $regex: new RegExp(companyName, "i") },
      district: district,
    });

    if (!company) {
      return res.status(404).json({ error: "Company not found" });
    }

    res.json(company);
  } catch (error) {
    console.error("Error fetching company details:", error);
    res.status(500).json({ error: error.message });
  }
});

// Delete company
app.delete("/api/companies/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCompany = await Company.findByIdAndDelete(id);

    if (!deletedCompany) {
      return res.status(404).json({ error: "Company not found" });
    }

    res.json({ message: "Company deleted successfully" });
  } catch (error) {
    console.error("Error deleting company:", error);
    res.status(500).json({ error: error.message });
  }
});

// Save user feedback
app.post("/api/feedback", async (req, res) => {
  try {
    const { rating, type, companyName, district } = req.body;
    
    const feedback = new Feedback({
      rating,
      type,
      companyName: companyName || null,
      district: district || null,
      ip: req.ip || req.connection.remoteAddress
    });
    
    const savedFeedback = await feedback.save();
    console.log("User feedback saved to MongoDB:", savedFeedback);
    res.json({ message: "Feedback saved successfully", feedback: savedFeedback });
  } catch (error) {
    console.error("Error saving feedback:", error);
    res.status(500).json({ error: error.message });
  }
});

// Get all feedback data
app.get("/api/feedback", async (req, res) => {
  try {
    const feedback = await Feedback.find().sort({ timestamp: -1 });
    res.json(feedback);
  } catch (error) {
    console.error("Error fetching feedback:", error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});
