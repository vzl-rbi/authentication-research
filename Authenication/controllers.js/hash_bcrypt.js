import validator from "validator";
import bcrypt from "bcrypt"; // <-- Add this
import { getDBConnection } from "../db/db.js";

const SALT_ROUNDS = 10; // Recommended strength

export async function registerUser(req, res) {
  let { name, email, username, password } = req.body;

  if (!name || !email || !username || !password) {
    return res.status(400).json({ error: "All fields are required." });
  }

  name = name.trim();
  email = email.trim().toLowerCase();
  username = username.trim();

  if (!/^[a-zA-Z0-9_-]{1,20}$/.test(username)) {
    return res.status(400).json({
      error:
        "Username must be 1–20 characters, using letters, numbers, _ or -.",
    });
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  try {
    const db = await getDBConnection();

    // Check for existing username or email
    const existingUser = await db.get(
      `SELECT username, email FROM users WHERE username = ? OR email = ?`,
      [username, email]
    );

    if (existingUser) {
      return res
        .status(409)
        .json({ error: "Email or username already in use." });
    }

    // Hash the password
    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

    // Insert user with HASHED password
    await db.run(
      `INSERT INTO users (name, email, username, password) VALUES (?, ?, ?, ?)`,
      [name, email, username, passwordHash] // <-- passwordHash, not password
    );

    return res.status(201).json({ message: "User rehistered" });
  } catch (err) {
    console.error("Registration error:", err.message);
    return res
      .status(500)
      .json({ error: "Registration failed. Please try again." });
  }
}
