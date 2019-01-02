import mongoose from 'mongoose';
import dbConfig from './index';
import logger from '../helpers/logger';

export default env => {
  mongoose.Promise = global.Promise;
  const config = dbConfig[env];
  const dbOptions = { useNewUrlParser: true, useCreateIndex: true };

  /**
   * @description - provides connection for mongo database
   * @function
   *
   * @param {String} url - mongo database url
   * @param {Object} options - extra parameter for mongodb setup
   *
   * @returns {*} - null
   */
  const connectMongodb = (url, options) => {
    mongoose.connect(
      url,
      options
    );
  };

  if (config.use_prod_env) {
    connectMongodb(process.env[config.use_prod_env], dbOptions);
  } else {
    const { prefix, host, database, username, password } = config;
    const url = `${prefix}://${username}:${password}@${host}:${config.port}/${database}`;

    connectMongodb(url, dbOptions);
  }

  const db = mongoose.connection;
  db.once('open', () => logger.info({ message: 'Connected to the database' }));

  db.on('error', () => logger.error({ message: 'MongoDB connection error:' }));
};
