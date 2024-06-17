const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require("bcryptjs");

const app = express();
app.use(cors);

// MySQL connection pool configuration
const pool = mysql.createPool({
  connectionLimit: 100,
  host: "localhost",
  user: "root",
  password: "",
  database: "ProManage", // Replace with your database name
});

// Test the MySQL connection
pool.getConnection((err, connection) => {
  if (err) {
    console.error("Unable to connect to the database:", err);
    return;
  }
  console.log("Connected to MySQL database");

  // Release the connection
  connection.release();
});

// Middleware to parse JSON request body
app.use(bodyParser.json());

// Auth routes
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find user by username
    const query = "SELECT * FROM users WHERE username = ?";
    pool.query(query, [username], async (error, results) => {
      if (error) {
        console.error("Error in login:", error);
        return res.status(500).send("Error logging in");
      }

      if (results.length === 0) {
        return res.status(404).send("User not found");
      }

      const user = results[0];
      // Compare passwords
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(401).send("Invalid credentials");
      }

      res.send("Login successful");
    });
  } catch (err) {
    console.error("Error in login:", err);
    res.status(500).send("Error logging in");
  }
});

app.post("/signup", async (req, res) => {
  const { email, username, password } = req.body;

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

    // Insert new user into database
    const query =
      "INSERT INTO users (email, username, password) VALUES (?, ?, ?)";
    pool.query(query, [email, username, hashedPassword], (error, results) => {
      if (error) {
        console.error("Error in signup:", error);
        return res.status(500).send("Error signing up");
      }

      res.status(201).send("Signup successful");
    });
  } catch (err) {
    console.error("Error in signup:", err);
    res.status(500).send("Error signing up");
  }
});

// Define a route handler for the root URL
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Start the server on port 3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
