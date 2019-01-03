import validator from 'validator';
import isEmpty from 'is-empty';
import dataResponse from '../../helpers/dataResponse';

/**
 * @description - checks for undefined inputs
 * @function
 *
 * @param {object} data - an object containing boolean values for undefined fields
 * @returns {string} - validation error message
 */
const checkForUndefinedData = data => {
  let message = '';
  let counter = 0;

  if (data.isUsernameUndefined || data.isEmailUndefined || data.isPasswordUndefined) {
    if (data.isUsernameUndefined) {
      message += 'username, ';
      counter += 1;
    }

    if (data.isEmailUndefined) {
      message += 'email, ';
      counter += 1;
    }

    if (data.isPasswordUndefined) {
      message += 'password, ';
      counter += 1;
    }

    if (counter > 1) message += 'are not defined';
    else message += 'is not defined';
  }

  const index = message.lastIndexOf(',');
  message = message.substring(0, index) + message.substring(index + 1);

  return message;
};

/**
 * @description - validates username input field
 * @function
 *
 * @param {String} username - user's username
 * @returns {String} - validation error message
 */
const validateUsername = username => {
  let error;

  if (!validator.isEmpty(username)) {
    if (!validator.toInt(username)) {
      if (!validator.isLength(username, { min: 3, max: 25 })) {
        error = 'Username must be at least 3 to 25 characters';
      }
    } else {
      error = 'Username must not start with a number';
    }
  } else {
    error = 'Username is required';
  }

  return error;
};

/**
 * @description - validates email input field
 * @function
 *
 * @param {String} email - user email
 * @param {String} processId - a flag used to check if its a signup or signin
 * @returns {String} - validation error message
 */
const validateEmail = (email, processId) => {
  let error;

  if (!validator.isEmpty(email)) {
    if (processId === 'signup') {
      if (!validator.isEmail(email)) {
        error = 'Email is invalid';
      }
    }
  } else {
    error = 'Email is required';
  }

  return error;
};

/**
 * @description - validates password input field
 *
 * @param {*} password - user's password
 * @param {*} processId - a flag used to check if its a signup or signin
 * @returns {String} - validation error message
 */
const validatePassword = (password, processId) => {
  let error;
  if (!validator.isEmpty(password)) {
    if (processId === 'signup') {
      if (!validator.isLength(password, { min: 6, max: 30 })) {
        error = 'Password length must be between 6 and 30';
      }
    }
  } else {
    error = 'Password is required';
  }

  return error;
};

/**
 * @description - acts as a middleware validation for user's form inputs
 *
 * @param {Object} request - nodejs http request object
 * @param {Object} response - nodejs http response object
 * @param {*} next - nodejs middleware next function
 * @returns {*} - validation error object or nodejs next function
 */
export const signUpValidations = (request, response, next) => {
  const { username, email, password } = request.body;
  const errors = {};

  const isUsernameUndefined = typeof username === 'undefined';
  const isEmailUndefined = typeof email === 'undefined';
  const isPasswordUndefined = typeof password === 'undefined';

  const message = checkForUndefinedData({
    isUsernameUndefined,
    isEmailUndefined,
    isPasswordUndefined
  });

  if (message) return dataResponse.error(response, 422, message);

  const trimmedUsername = username.trim();
  const trimmedEmail = email.trim();
  const trimmedPassword = password.trim();

  const usernameError = validateUsername(trimmedUsername);
  const emailError = validateEmail(trimmedEmail, 'signup');
  const passwordError = validatePassword(trimmedPassword, 'signup');

  if (usernameError) errors.username = usernameError;
  if (emailError) errors.email = emailError;
  if (passwordError) errors.password = passwordError;

  if (!isEmpty(errors)) {
    return dataResponse.error(response, 400, errors);
  }
  return next();
};

/**
 * @description - acts as a middleware validation for user's form inputs
 *
 * @param {Object} request - nodejs http request object
 * @param {Object} response - nodejs http response object
 * @param {*} next - nodejs middleware next function
 * @returns {*} - validation error object or nodejs next function
 */
export const signInValidations = (request, response, next) => {
  const { email, password } = request.body;
  const errors = {};

  const isEmailUndefined = typeof email === 'undefined';
  const isPasswordUndefined = typeof password === 'undefined';

  const message = checkForUndefinedData({ isEmailUndefined, isPasswordUndefined });

  if (message) return dataResponse.error(response, 422, message);

  const trimmedEmail = email.trim();
  const trimmedPassword = password.trim();

  const emailError = validateEmail(trimmedEmail, 'signin');
  const passwordError = validatePassword(trimmedPassword, 'signin');

  if (emailError) errors.email = emailError;
  if (passwordError) errors.password = passwordError;

  if (!isEmpty(errors)) {
    return dataResponse.error(response, 400, errors);
  }
  return next();
};
