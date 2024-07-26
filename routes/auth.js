const express = require("express");
const router = express.Router();
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../models");

// Rute registrasi
router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcryptjs.hash(password, 10);
  try {
    const user = await db.User.create({ username, password: hashedPassword });
    res.json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error registering user" });
  }
});

// Rute login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await db.User.findOne({ where: { username } });
  if (user) {
    const isMatch = await bcryptjs.compare(password, user.password);
    if (isMatch) {
      const accessToken = jwt.sign(
        { username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      res.json({ accessToken });
    } else {
      res.status(401).json({ message: "Password incorrect" });
    }
  } else {
    res.status(401).json({ message: "User not found" });
  }
});

module.exports = router;
