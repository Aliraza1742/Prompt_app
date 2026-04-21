const express = require('express');
const cors = require('cors');
const config = require('./config/config');
const { initializeDatabase } = require('./config/database');
const { initializeOpenAI } = require('./config/openai');
const apiRoutes = require('./routes');
const errorHandler = require('./middleware/errorHandler');

// Initialize services
initializeDatabase();
initializeOpenAI();

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Mount API routes
app.use('/api', apiRoutes);

// Error handling middleware
app.use(errorHandler);

// Start server
app.listen(config.port, () => {
  console.log(`Server running on http://localhost:${config.port}`);
});
