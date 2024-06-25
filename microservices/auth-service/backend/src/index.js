const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const port = process.env.PORT ; 
 
app.use(express.json()); // Built-in middleware to parse JSON bodies

let users = []; // This should be replaced with a database

// Register
app.post('/register', (req, res) => {
    const { username, password } = req.body;
    users.push({ username, password });
    res.status(201).send('User registered');
});

// Login
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        const token = jwt.sign({ username }, 'secret', { expiresIn: '1h' });
        res.json({ token });
    } else {
        res.status(401).send('Invalid credentials');
    }
});

// Authenticate
app.get('/authenticate', (req, res) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).send('Access denied');
    }
    jwt.verify(token, 'secret', (err, decoded) => {
        if (err) {
            return res.status(401).send('Invalid token');
        }
        res.status(204).send();
    });
});

app.listen(port, () => {
    console.log(`Authentication service listening on port ${port}`);
});
