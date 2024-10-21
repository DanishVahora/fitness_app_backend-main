//index.js
require('dotenv').config(); // Load environment variables
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const userRoutes = require('./routes/userRoutes');

const app = express();
const port = process.env.PORT || 8000;

// Middleware
app.use(cors()); // Enable CORS
app.use(helmet()); // Set security headers
app.use(morgan('dev')); // HTTP request logging
app.use(bodyParser.json()); // Parse JSON bodies

// Routes
app.use('/', userRoutes);

// Basic routes for testing
app.get('/', (req, res) => {
    res.send("Welcome to the backend of the fitness app");
});

app.get('/about', (req, res) => {
    res.send("This is the backend of the fitness app");
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app;
