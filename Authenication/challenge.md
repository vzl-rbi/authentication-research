/\*
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
\*/

/\*
Challenge:

1. Check if the username or email address has already been used.

   - If it has, end the response with a suitable status code and this object:
     { error: 'Email or username already in use.' }.

   - If the username and email address are unique in the database, add the user to the table and send this JSON { message: 'User rehistered'}. Which status code should you use?

- When you have been successful, the mini browser will redirect to the homepage.

- Run logTable.js to check you have created a user.

- You will be able to see the password in the db! We will fix that later!
  \*/
