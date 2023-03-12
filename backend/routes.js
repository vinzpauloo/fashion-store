const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { login, getUsers } = require("./handlers");
const db = require("./db");

/* Creating a new router object. */
const router = express.Router();

// Login API
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const [rows, fields] = await db.query(
      `SELECT * FROM users WHERE email = ?`,
      [email]
    );

    /* Checking if the user exists in the database. */
    if (rows.length > 0) {
      const user = rows[0];
      const match = await bcrypt.compare(password, user.password);

      if (match) {
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
          expiresIn: "30d",
        });
        res.json({ token });
      } else {
        res.status(401).json({ message: "Invalid email or password" });
      }
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// Register API
router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await db.query(
      `INSERT INTO users (email, password) VALUES (?, ?)`,
      [email, hashedPassword]
    );
    res.json({ id: result.insertId });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// GET ALL USERS
router.get("/users", async (req, res) => {
  try {
    const [rows, fields] = await db.query("SELECT * FROM users");
    res.json(rows);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

module.exports = router;
