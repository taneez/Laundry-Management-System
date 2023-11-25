/* eslint-disable no-undef */
const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const cors = require("cors");
const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

// Create a connection pool
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "logi3002",
  database: "laundry",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// server.js
app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  // Check if the username already exists in the database
  pool.query(
    "SELECT * FROM users WHERE username = ?",
    [username],
    async (err, results) => {
      if (err) {
        console.error("Error querying database:", err);
        return res.status(500).json({ message: "Internal Server Error" });
      }

      // If the username already exists, return an error
      if (results.length > 0) {
        return res.status(400).json({ message: "Username already exists" });
      }

      try {
        // Hash the password using bcrypt
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert the user into the database
        pool.query(
          "INSERT INTO users (username, password) VALUES (?, ?)",
          [username, hashedPassword],
          (insertError) => {
            if (insertError) {
              console.error("Error registering user:", insertError);
              return res.status(500).json({ message: "Internal Server Error" });
            }

            return res.status(201).json({ message: "Registration successful" });
          }
        );
      } catch (hashError) {
        console.error("Error hashing password:", hashError);
        return res.status(500).json({ message: "Internal Server Error" });
      }
    }
  );
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Retrieve user data from the database
  pool.query(
    "SELECT * FROM users WHERE username = ?",
    [username],
    async (err, results) => {
      if (err) {
        console.error("Error querying database:", err);
        res.status(500).json({ message: "Internal Server Error" });
        return;
      }

      // Check if a user with the given username exists
      if (results.length > 0) {
        const storedPassword = results[0].password;

        // Compare the provided password with the stored hashed password
        const passwordsMatch = await bcrypt.compare(password, storedPassword);

        if (passwordsMatch) {
          const user_id = results[0].id; // Get the user_id
          res.status(200).json({ message: "Login successful", user_id });
        } else {
          res.status(401).json({ message: "Invalid password" });
        }
      } else {
        res.status(401).json({ message: "Invalid username" });
      }
    }
  );
});

app.post("/submitComplaint", (req, res) => {
  const { complaintText, user_id } = req.body;

  // Insert the complaint into the database
  pool.query(
    "INSERT INTO complaints (user_id, complaint_text) VALUES (?, ?)",
    [user_id, complaintText],
    (insertError) => {
      if (insertError) {
        console.error("Error submitting complaint:", insertError);
        return res.status(500).json({ message: "Internal Server Error" });
      }

      return res
        .status(201)
        .json({ message: "Complaint submitted successfully" });
    }
  );
});

// Import necessary modules

app.post("/postItem/:tableName", (req, res) => {
  const tableName = req.params.tableName;
  const { description, image_url, date_posted } = req.body;

  pool.query(
    `INSERT INTO ${tableName} (description, image_url, date_posted) VALUES (?, ?, ?)`,
    [description, image_url, date_posted],
    (error) => {
      if (error) {
        console.error("Error posting item:", error);
        res.status(500).json({ message: "Internal Server Error" });
      } else {
        res.status(201).json({ message: "Item posted successfully" });
      }
    }
  );
});

// Import necessary modules

app.post("/postLostItem", (req, res) => {
  const { description, image, date } = req.body;

  pool.query(
    "INSERT INTO lost_items (description, image_url, date_posted) VALUES (?, ?, ?)",
    [description, image, date],
    (error) => {
      if (error) {
        console.error("Error posting lost item:", error);
        res.status(500).json({ message: "Internal Server Error" });
      } else {
        res.status(201).json({ message: "Lost item posted successfully" });
      }
    }
  );
});

app.post("/postFoundItem", (req, res) => {
  const { description, image, date } = req.body;

  pool.query(
    "INSERT INTO found_items (description, image_url, date_posted) VALUES (?, ?, ?)",
    [description, image, date],
    (error) => {
      if (error) {
        console.error("Error posting found item:", error);
        res.status(500).json({ message: "Internal Server Error" });
      } else {
        res.status(201).json({ message: "Found item posted successfully" });
      }
    }
  );
});

app.post("/postLaundryInfo", (req, res) => {
  const { hostelName, dateReceived, bagsReceived, status, submissions } =
    req.body;

  pool.query(
    "INSERT INTO laundry_info (hostelName, dateReceived, bagsReceived, status) VALUES (?, ?, ?, ?)",
    [hostelName, dateReceived, bagsReceived, status],
    (error, result) => {
      if (error) {
        console.error("Error posting laundry info:", error);
        res.status(500).json({ message: "Internal Server Error" });
      } else {
        const laundryInfoId = result.insertId;

        // Insert laundry submissions
        submissions.forEach((submission) => {
          pool.query(
            "INSERT INTO laundry_submissions (laundryInfoId, name, email, phoneNumber, clothesCount) VALUES (?, ?, ?, ?, ?)",
            [
              laundryInfoId,
              submission.name,
              submission.email,
              submission.phoneNumber,
              submission.clothesCount,
            ],
            (submissionError) => {
              if (submissionError) {
                console.error(
                  "Error posting laundry submission:",
                  submissionError
                );
                res.status(500).json({ message: "Internal Server Error" });
              }
            }
          );
        });

        res
          .status(201)
          .json({ message: "Laundry information posted successfully" });
      }
    }
  );
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
