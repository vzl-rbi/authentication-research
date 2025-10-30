/*
import express from "express";
import bcrypt from "bcrypt";
const app = express();

// Wrap the async code in an immediately invoked function expression
(async () => {
  const userInDb = {
    name: "Robert Walker",
    password: "$2b$10$wSTaMWFYJvAY75oE7rVxueye/lCNnqAhfFQxMnYqtbMs.LZHLnOSm",
  };

  const loginAttempt = {
    name: "Robert Walker",
    password: "skywalker11", //password: req.body.password, // Get password from request body
  };

  try {
    const userIdMatch = await bcrypt.compare(
      loginAttempt.password,
      userInDb.password
    );

    if (userIdMatch === true) {
      console.log("password matched");
    } else {
      console.log("password not matched");
    }
  } catch (error) {
    console.error("Error:", error);
  }
})();

app.listen(8000, () => console.log("listening 8000"));

*/
import express from "express";
import bcrypt from "bcrypt";
const app = express();

app.use(express.json()); // Add this to parse JSON bodies

// Move the bcrypt comparison inside an async function or route handler
app.get("/login", async (req, res) => {
  const userInDb = {
    name: "Robert Walker",
    password: "$2b$10$wSTaMWFYJvAY75oE7rVxueye/lCNnqAhfFQxMnYqtbMs.LZHLnOSm",
  };

  const loginAttempt = {
    name: "Robert Walker",
    password: "skywalker11",
  };

  try {
    const userIdMatch = await bcrypt.compare(
      loginAttempt.password,
      userInDb.password
    );

    if (userIdMatch === true) {
      console.log("password matched");
      res.send("Login successful");
    } else {
      console.log("password not matched");
      res.status(401).send("Invalid credentials");
    }
  } catch (error) {
    console.error("Error comparing passwords:", error);
    res.status(500).send("Internal server error");
  }
});

app.listen(8000, () => console.log("listening at http://localhost:8000"));
