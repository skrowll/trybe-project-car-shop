import express from 'express';
import carRouter from './routes/car.route';
import motorcycleRoute from './routes/motorcycle.route';
import errorHandler from './middlewares/error.middleware';
import 'express-async-errors';

const app = express();
app.use(express.json());

app.use('/cars', carRouter);
app.use('/motorcycle', motorcycleRoute);

app.use(errorHandler);

export default app;
