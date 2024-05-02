const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 3000;

// Use the cors middleware
app.use(cors());

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Define a route to serve the index.html file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Define a route to add two numbers
app.get('/add', (req, res) => {
  const { num1, num2 } = req.query;

  // Check if both numbers are provided
  if (!num1 || !num2) {
    return res.status(400).json({ error: 'Please provide both numbers.' });
  }

  // Convert the numbers to integers
  const number1 = parseInt(num1);
  const number2 = parseInt(num2);

  // Check if the conversion was successful
  if (isNaN(number1) || isNaN(number2)) {
    return res.status(400).json({ error: 'Invalid numbers provided.' });
  }

  // Perform the addition
  const result = number1 + number2;

  // Send the result as JSON
  res.json({ result });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
