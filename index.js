
const express = require("express");
const { Pool } = require("pg");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));

// PostgreSQL connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Initialize database table
async function initDatabase() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS companies (
        id SERIAL PRIMARY KEY,
        district VARCHAR(100) NOT NULL,
        role VARCHAR(200) NOT NULL,
        company_name VARCHAR(200) NOT NULL,
        address TEXT NOT NULL,
        phone VARCHAR(10) NOT NULL,
        whatsapp VARCHAR(10) NOT NULL,
        openings INTEGER NOT NULL,
        education VARCHAR(100) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log("Database table initialized");
  } catch (error) {
    console.error("Database initialization error:", error);
  }
}

initDatabase();

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
      education,
    } = req.body;

    // Insert into PostgreSQL
    const result = await pool.query(`
      INSERT INTO companies (district, role, company_name, address, phone, whatsapp, openings, education)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *
    `, [district, role, companyName, address, phone, whatsapp, parseInt(openings), education]);

    res.json({
      success: true,
      message: "Company data saved successfully!",
      data: result.rows[0],
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
    const result = await pool.query("SELECT * FROM companies ORDER BY created_at DESC");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});
