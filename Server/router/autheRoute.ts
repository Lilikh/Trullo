import express from "express";
import jwt from "jsonwebtoken";
import { getUserByEmail, verifyPassword } from "../models/userCrud";  // Ensure these functions exist in your userCrud file

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "fallbacksecret";  // Store your secret in the .env file

// Login Route: Creates a token after user login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Step 1: Find user by email
    const user = await getUserByEmail(email);  // You should implement this in your userCrud.ts
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Step 2: Verify the password (ensure you have a function to compare hashed passwords)
    const isPasswordValid = await verifyPassword(password, user.password);  // Assuming you are hashing passwords
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Step 3: Generate JWT token for the user
    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: "1h" });

    // Step 4: Send the token in the response
    res.status(200).json({ token });

  } catch (error) {
    res.status(500).json({ error: "An unknown error occurred" });
  }
});

export default router;
