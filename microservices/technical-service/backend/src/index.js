require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3005;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Technical Service is running!');
});

app.listen(PORT, () => {
  console.log(`Technical Service is running on port ${PORT}`);
});
