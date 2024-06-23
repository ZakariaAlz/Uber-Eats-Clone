const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const router = require('./src/routes');
const userRoutes = require('./src/routes/user');
const db = require("./src/SQLmodels");

const app = express();

// Enable CORS
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002', 'http://localhost:3003', 'http://localhost:3004', 'http://localhost:3005', 'http://localhost:3006', 'http://localhost:5010'], // Update with your frontend URLs
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    allowedHeaders: ['Content-Type', 'apiKey', 'Authorization', 'accessToken' ,'role']
}));


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
app.use('/api/user', userRoutes);



const PORT = 5007;
app.listen(PORT, () => {
    console.log(`Auth running on port ${PORT}`);
});
