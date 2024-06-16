const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');
const mongoose = require('mongoose');
const authMiddleware = require('./src/middleware/authmiddleware'); // Import the auth middleware
const bodyParser = require('body-parser');
const apiKeyMiddleware = require('./src/middleware/api-key');
require('dotenv').config();
const router = require('./src/routes');


const app = express();
const db = require("./src/SQLmodels");

app.use(express.json());

app.use(apiKeyMiddleware);
app.use('/api', router);

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to the database');
    // Start the server after successfully connecting to the database
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
    process.exit(1);
  });


db.sequelize.sync()
.then(() => console.log('MySQL connected...'))
.catch(err => console.log(err));

const services = [
    { path: '/client-service', target: 'http://localhost:5001' },
    { path: '/delivery-service', target: 'http://localhost:5002' },
    { path: '/restaurateur-service', target: 'http://localhost:5003' },
    { path: '/sales-service', target: 'http://localhost:5004' },
    { path: '/technical-service', target: 'http://localhost:5005' },
    { path: '/developper-service', target: 'http://localhost:5006' },
];
const servicesDocker = [
    { path: '/client-service/api', target: 'http://client-service-backend:5001' },
    { path: '/delivery-service/api', target: 'http://delivery-service-backend:5002' },
    { path: '/restaurateur-service/api', target: 'http://restaurateur-service-backend:5003' },
    { path: '/sales-service/api', target: 'http://sales-service-backend:5004' },
    { path: '/technical-service/api', target: 'http://technical-service-backend:5005' },
    { path: '/developper-service/api', target: 'http://developper-service-backend:5006' },
];


// Enable CORS
app.use(cors({
    origin: ['http://localhost:3001', 'http://localhost:3002', 'http://localhost:3003', 'http://localhost:3004', 'http://localhost:3005', 'http://localhost:3006', 'http://localhost:5010'], // Update with your frontend URLs
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    allowedHeaders: ['Content-Type', 'authenticated', 'apiKey', 'accessToken', 'role'] // Add 'authenticated' header
}));

// // // Middleware to parse JSON bodies
// app.use(bodyParser.json());

// API verification middleware
app.use((req, res, next) => {
    const apiKey = req.headers.apikey;  // Header keys are case-insensitive, but typically lowercase is used
    if (!apiKey) {
        return res.status(401).json({ error: 'API key is missing' });
    }

    // Replace this with your actual API key verification logic
    if (apiKey === process.env.API_KEY) {
        next();
    } else {
        res.status(403).json({ error: 'Invalid API key' });
    }
});

// // Logging middleware
// app.use((req, res, next) => {
//     console.log(`Received request: ${req.method} ${req.url}`);
//     next();
// });

// // Public routes (login and signup)
// const loginPath = ['/enduser/api', '/restaurateur/api', '/delivery/api', '/developer/api', '/commercial/api', '/technical/api'];
// loginPath.forEach(path => {
//     app.use(path, loginRoutes);
// });

// // Authentication middleware for protected routes
// const userPath = ['/enduser/api/users', '/restaurateur/api/users', '/delivery/api/users', '/developer/api/users', '/commercial/api/users', '/technical/api/users'];
// userPath.forEach(path => {
//     app.use(path, authMiddleware, userRoutes);
// });

// // Proxy setup with authentication middleware and user info in headers
services.forEach(service => {
    app.use(service.path, authMiddleware, (req, res, next) => {
        createProxyMiddleware({
            target: service.target,
            changeOrigin: true,
            pathRewrite: { [`^${service.path}`]: '' },
        })(req, res, next);
    });
});

// services.forEach(service => {
//     app.use(service.path, createProxyMiddleware({
//         target: service.target,
//         changeOrigin: true,
//         pathRewrite: { [`^${service.path}`]: '' }
//     }));
// });

const PORT = 5007;
app.listen(PORT, () => {
    console.log(`Auth running on port ${PORT}`);
});
