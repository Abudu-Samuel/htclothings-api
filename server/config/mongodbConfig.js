import mongoose from 'mongoose';
import dbConfig from './index';
import logger from '../helpers/logger';

export default env => {
  mongoose.Promise = global.Promise;
  const config = dbConfig[env];
  const urlParser = { useNewUrlParser: true };

  if (config.use_prod_env) {
    mongoose.connect(
      process.env[config.use_prod_env],
      urlParser
    );
  } else {
    const { prefix, host, database, username, password } = config;
    const url = `${prefix}://${username}:${password}@${host}:${config.port}/${database}`;
    mongoose.connect(
      url,
      urlParser
    );
  }

  const db = mongoose.connection;
  db.once('open', () => logger.info({ message: 'Connected to the database' }));

  db.on('error', () => logger.error({ message: 'MongoDB connection error:' }));
};
