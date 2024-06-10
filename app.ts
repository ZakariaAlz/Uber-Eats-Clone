import healthcheckRouter from './healthcheck';
const app = express();
app.use(express.json());
app.use('/api/healthcheck', healthcheckRouter);
// other routes and middleware...