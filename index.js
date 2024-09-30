const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./db'); // Import the database connection
const User = require('./models/User'); // Import the User model
const Address = require('./models/Address'); // Import the Address model

const app = express();

// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname)));

// Use body-parser to parse JSON bodies
app.use(bodyParser.json());

// Serve the form HTML file on the root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// POST /register - Handle form submission
app.post('/register', async (req, res) => {
  try {
    const { name, address } = req.body; // Get name and address from the request body

    // Create a new user entry
    const user = await User.create({ name });

    // Create a new address entry linked to the user
    await Address.create({ address, userId: user.id });

    // Send a success response
    res.status(201).json({ message: 'User and address stored successfully!' });
  } catch (error) {
    // Handle any errors
    res.status(500).json({ error: error.message });
  }
});

// Sync database and start the server
sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
});
