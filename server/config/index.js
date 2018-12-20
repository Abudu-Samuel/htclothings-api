import dotenv from 'dotenv';

dotenv.config();

const defaults = {
  prefix: 'mongodb',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD
};

const environmentConfig = {
  development: {
    ...defaults,
    database: process.env.DEV_DB_NAME
  },
  test: {
    ...defaults,
    database: process.env.TEST_DB_NAME
  },
  production: {
    use_prod_env: 'MONGODB_URI'
  }
};

export default environmentConfig;
