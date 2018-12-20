import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import compression from 'compression';
import dotenv from 'dotenv';
import logger from './helpers/logger';
import mongodbConfig from './config/mongodbConfig';

dotenv.config();

const app = express();
const env = process.env.NODE_ENV || 'development';
const port = env === 'test' ? 4001 : process.env.PORT || 4000;

app.use(compression());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongodbConfig(env);

app.get('/api/v1', (request, response) => {
  response.json({
    status: 'Success',
    message: 'Welcome to HTClothings API'
  });
});

/** Add API routes function here */

app.all('*', (request, response) => {
  response.status(404).json({
    status: 'Failed',
    message: 'API route does not exist. Redirect to /api/v1'
  });
});

app.listen(port, () =>
  logger.info({
    message: `server started on port ${port}`
  })
);

export default app;
