import { STATUS_CODES } from 'http';

export default {
  internalError: 'Internal server error',
  generalError: 'Oops!. An error occurred',
  success(response, statusCode, message, payload) {
    const output = {
      status: STATUS_CODES[statusCode],
      message
    };
    if (payload) {
      response.status(statusCode).json({ ...output, payload });
    } else {
      response.status(statusCode).json({
        status: STATUS_CODES[statusCode],
        message
      });
    }
  },
  error(response, statusCode, message) {
    response.status(statusCode).json({
      status: STATUS_CODES[statusCode],
      message
    });
  }
};
