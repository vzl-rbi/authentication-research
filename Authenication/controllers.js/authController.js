import validator from "validator";

export async function registerUser(req, res) {
  let { name, email, username, password } = req.body;

  // Validate all fields are present
  if (!name || !email || !username || !password) {
    console.log("Validation failed: Missing fields");
    return res.status(400).json({ error: "All fields are required." });
  }

  // Remove whitespace and validate
  name = name.trim();
  email = email.trim();
  username = username.trim();

  // Check if fields are empty after trimming
  if (!name || !email || !username) {
    console.log("Validation failed: Empty fields after trimming");
    return res.status(400).json({ error: "All fields are required." });
  }

  // Validate username format
  const usernameRegex = /^[a-zA-Z0-9_-]{1,20}$/;
  if (!usernameRegex.test(username)) {
    console.log("Validation failed: Invalid username format");
    return res.status(400).json({
      error:
        "Username must be 1-20 characters long and can only contain letters, numbers, hyphens, and underscores.",
    });
  }

  // Validate email format
  if (!validator.isEmail(email)) {
    console.log("Validation failed: Invalid email format");
    return res.status(400).json({ error: "Invalid email format." });
  }

  // If all validations pass
  console.log("All validations passed:", { name, email, username });
  // Continue with user registration logic...
}
// Here's the completed registerUser function with the challenge requirements implemented:
try {
  const db = await getDBConnection();

  // 1. Check if username or email already exists
  const checkUser = await db.get(
    `SELECT username, email FROM users WHERE username = ? OR email = ?`,
    [username, email]
  );

  if (checkUser) {
    return res.status(409).json({ error: "Email or username already in use." });
  }

  // Insert new user
  await db.run(
    `INSERT INTO users (name, email, username, password) VALUES (?, ?, ?, ?)`,
    [name, email, username, password]
  );

  // Success: User registered
  return res.status(201).json({ message: "User rehistered" });
} catch (err) {
  console.error("Registration error:", err.message);
  res.status(500).json({ error: "Registration failed. Please try again." });
}
