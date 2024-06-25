const express = require('express');
const router = express.Router();
const Admin = require('../classes/AdminClass');
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");
const Client = require('../classes/ClientClass');

router.post('/client/signup', async (req, res) => {
    try {
        const client_ = req.body;
    
        const client = await Client.create(client_)

        const token = jwt.sign(client.toJSON(), process.env.TOKEN_SECRET_KEY);
    
        res.json({client, token});   //(, token) inside 
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
});

router.post('/sign-in', async (req, res) => {
    try {
        const { username, password } = req.body;
        const admin = await Admin.findByUsername(username);
    
        if (!admin) {
          return res.status(401).json({ message: 'Invalid username or password' });
        }
    
        const isValidPassword = await bcrypt.compare(password, admin.password)
    
        if (!isValidPassword) {
          return res.status(401).json({ message: 'Invalid username or password' });
        }
    
        const token = jwt.sign(admin.toJSON(), process.env.TOKEN_SECRET_KEY);

        const { firstname, lastname } = admin;
    
        res.json({ token, admin });
      } catch (error) {
        console.log(error)
        res.status(500).send(error)
      }
});

router.post('/client/sign-in', async (req, res) => {
  try {
    const { email, password } = req.body;
    const client = await Client.findByEmail(email);

    if (!client) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const isValidPassword = await bcrypt.compare(password, client.password);
    console.log(password)

    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign(client.toJSON(), process.env.TOKEN_SECRET_KEY);

    const { firstName, lastName } = client;

    res.json({ token, client });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});


module.exports = router;