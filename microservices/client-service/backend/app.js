const express = require('express');
const mongoose = require('mongoose');
const db = require("./src/SQLmodels");
const verifyMicroserviceApiKey = require('./src/middleware/verifyMicroserviceApiKey');
const router = require('./src/routes');
require('dotenv').config();

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use('/api', router);


mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    // mongoose.connect('mongodb://mongo:27017/cesi-eats')
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

db.sequelize.sync()
    .then(() => console.log('MySQL connected...'))
    .catch(err => console.log(err));

app.use(express.json())

// Apply the middleware to all routes
app.use(verifyMicroserviceApiKey);



const PORT = 5001;
app.listen(PORT, () => {
    console.log(`Client backend running on port ${PORT}`);
});

