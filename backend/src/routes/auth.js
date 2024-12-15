import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { query } from "../config/database.js";
import { config } from "../config/config.js";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

// Email configuration
const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Store OTPs temporarily (in production, use Redis or similar)
const otpStore = new Map();

router.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await query("SELECT id FROM users WHERE email = $1", [
      email,
    ]);
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ error: "Email already registered" });
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otpStore.set(email, {
      otp,
      password,
      timestamp: Date.now(),
    });

    // Send verification email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Verify your email",
      html: `
        <h1>Email Verification</h1>
        <p>Your verification code is: <strong>${otp}</strong></p>
        <p>This code will expire in 10 minutes.</p>
      `,
    });

    res.status(200).json({ message: "Verification code sent" });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ error: "Error creating user" });
  }
});

router.post("/verify-email", async (req, res) => {
  const { email, otp } = req.body;

  try {
    const storedData = otpStore.get(email);
    if (!storedData) {
      return res.status(400).json({ error: "Verification code expired" });
    }

    if (storedData.otp !== otp) {
      return res.status(400).json({ error: "Invalid verification code" });
    }

    if (Date.now() - storedData.timestamp > 600000) {
      // 10 minutes
      otpStore.delete(email);
      return res.status(400).json({ error: "Verification code expired" });
    }

    const passwordHash = await bcrypt.hash(storedData.password, 10);
    const result = await query(
      "INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING id, email",
      [email, passwordHash]
    );

    const token = jwt.sign({ userId: result.rows[0].id }, config.jwtSecret);
    otpStore.delete(email);

    res.status(201).json({
      user: result.rows[0],
      token,
    });
  } catch (error) {
    console.error("Verification error:", error);
    res.status(500).json({ error: "Error verifying email" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await query(
      "SELECT id, email, password_hash FROM users WHERE email = $1",
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const user = result.rows[0];
    const validPassword = await bcrypt.compare(password, user.password_hash);

    if (!validPassword) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user.id }, config.jwtSecret);
    res.json({
      user: { id: user.id, email: user.email },
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Error during login" });
  }
});

export default router;
