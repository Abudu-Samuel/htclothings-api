import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import compression from 'compression';
import dotenv from 'dotenv';
import cors from 'cors';
import logger from './helpers/logger';
import mongodbConfig from './config/mongodbConfig';
import userRoutes from './routes/userRoutes';
import dataResponse from './helpers/dataResponse';

dotenv.config();

const app = express();
const env = process.env.NODE_ENV || 'development';
const port = env === 'test' ? 4001 : process.env.PORT || 4000;

app.use(compression());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

mongodbConfig(env);

app.get('/api/v1', (request, response) =>
  dataResponse.success(response, 200, 'Welcome to HT-Clothings API')
);

app.use('/api/v1', userRoutes);

app.all('*', (request, response) =>
  dataResponse.error(response, 404, 'API route does not exist. Redirect to /api/v1')
);

app.listen(port, () =>
  logger.info({
    message: `server started on port ${port}`
  })
);

export default app;
