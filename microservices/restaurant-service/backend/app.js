const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');   
const db = require("./src/SQLmodels");
const verifyMicroserviceApiKey = require('./src/middleware/verifyMicroserviceApiKey');
const router = require('./src/routes');
const bodyParser = require('body-parser');  
require('dotenv').config();
const os = require('os');


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



const PORT = 5003;
app.listen(PORT, () => {
    console.log(`Restaurant backend running on port ${PORT}`);
});

app.get('/api/performance', (req, res) => {
    // RAM consumption
    const totalMem = os.totalmem();
    const freeMem = os.freemem();
    const usedMem = totalMem - freeMem;
    const ramUsage = {
      total: (totalMem / (1024 ** 3)).toFixed(2) + ' GB',
      used: (usedMem / (1024 ** 3)).toFixed(2) + ' GB',
      free: (freeMem / (1024 ** 3)).toFixed(2) + ' GB',
      usagePercentage: ((usedMem / totalMem) * 100).toFixed(2) + ' %'
    };
  
    // CPU consumption
    const cpus = os.cpus();
    const cpuUsage = cpus.map((cpu, index) => {
      const total = Object.values(cpu.times).reduce((acc, tv) => acc + tv, 0);
      const usage = {
        model: cpu.model,
        speed: cpu.speed + ' MHz',
        usage: ((total - cpu.times.idle) / total * 100).toFixed(2) + ' %'
      };
      return { [`CPU ${index}`]: usage };
    });
  
      // Combine all metrics
      const performance = {
        ramUsage,
        cpuUsage,
      };
  
      res.json(performance);
  });

