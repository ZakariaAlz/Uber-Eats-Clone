import express from 'express';
import healthcheckRouter from './routes/healthcheck';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/healthcheck', healthcheckRouter);

// other routes and middleware...

app.listen(port, () => {
  console.log(`Authentication service listening on port ${port}`);
});
