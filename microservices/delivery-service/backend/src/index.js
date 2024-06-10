require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3003;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Delivery Service is running!');
});

app.listen(PORT, () => {
  console.log(`Delivery Service is running on port ${PORT}`);
});
