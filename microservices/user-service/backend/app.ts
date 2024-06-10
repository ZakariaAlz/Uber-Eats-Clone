import express from 'express';
import healthcheckRouter from './routes/healthcheck';
import authRouter from './routes/authRoutes';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/healthcheck', healthcheckRouter);
app.use('/api/auth', authRouter);

// other routes and middleware...

app.listen(port, () => {
  console.log(`Authentication service listening on port ${port}`);
});
