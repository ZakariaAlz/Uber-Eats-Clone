const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');   
const db = require("./src/SQLmodels");
const verifyMicroserviceApiKey = require('./src/middleware/verifyMicroserviceApiKey');
const router = require('./src/routes');
const bodyParser = require('body-parser');  
require('dotenv').config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use('/api', router);






mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    // mongoose.connect('mongodb://mongo:27017/cesi-eats')
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

db.sequelize.sync()
    .then(() => console.log('MySQL connected...'))
    .catch(err => console.log(err));


// Apply the middleware to all routes
app.use(verifyMicroserviceApiKey);



const PORT = 5006;
app.listen(PORT, () => {
    console.log(`Restaurant backend running on port ${PORT}`);
});

