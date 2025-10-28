/* To handle authentication during signup in Express.js, you'll need middleware to process incoming requests and manage the authentication flow. Here's a structured approach for your app.js or server.js:
 */
// ****** 1. Essential Middleware ***************

// Parse JSON and form data
app.use(express.json()); // For JSON bodies
app.use(express.urlencoded({ extended: true })); // For form data

// Enable CORS (if frontend/backend are separate)
const cors = require("cors");
app.use(cors());

// Environment variables (for secrets)
require("dotenv").config();
