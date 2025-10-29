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

/*
Key validation steps:

Checks for presence of all required fields

Trims whitespace from text fields

Validates username against the specified regex pattern

Uses the validator package to check email format

Returns appropriate error messages with 400 status code

Includes console.logs for testing as requested

The validation will:

Reject empty fields with "All fields are required"

Reject usernames with invalid characters or length with a descriptive message

Reject invalid email formats with "Invalid email format"

Continue with registration if all validations pass

Remember to install the validator package if not already present:
*/
