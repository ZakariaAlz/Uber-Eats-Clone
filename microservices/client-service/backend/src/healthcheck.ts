import express from 'express';
const router = express.Router();

router.get('/healthcheck', (req, res) => {
  res.send('OK');
});

export default router;
