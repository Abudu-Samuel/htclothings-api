import { createLogger, format, transports, addColors } from 'winston';

const myCustomLevels = {
  levels: {
    error: 0,
    warn: 1,
    info: 2
  },
  colors: {
    error: 'red',
    warn: 'yellow',
    info: 'grenn'
  }
};

addColors(myCustomLevels.colors);

export default createLogger({
  levels: myCustomLevels.levels,
  format: format.json(),
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'error.log', level: 'error' }),
    new transports.File({ filename: 'combined.log' })
  ]
});
