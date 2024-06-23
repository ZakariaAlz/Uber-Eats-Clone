const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const apiKeyMiddleware = require('./src/middleware/api-key');
require('dotenv').config();
const router = require('./src/routes');
const userRoutes = require('./src/routes/user');
const db = require("./src/SQLmodels");

const app = express();

// Enable CORS
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// API key verification middleware
app.use(apiKeyMiddleware);

// MongoDB connection
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to the database');
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
    process.exit(1);
  });

// MySQL connection
db.sequelize.sync()
  .then(() => console.log('MySQL connected...'))
  .catch(err => console.log(err));

// Routes

app.use('/api', router);

const PORT = 5007;
app.listen(PORT, () => {
    console.log(`Auth running on port ${PORT}`);
});
