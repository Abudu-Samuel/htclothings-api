import User from '../models/User';
import dataResponse from '../helpers/dataResponse';
import generateToken from '../helpers/generateToken';

/**
 * @description - controller function for user signup operation
 * @function
 *
 * @param {*} request - nodejs http request object
 * @param {Object} response - nodejs http response object
 *
 * @returns {Object} - json object of either error or success
 */
export const userSignUp = async (request, response) => {
  const { username, email, password } = request.body;

  try {
    const foundUser = await User.findOne({
      $or: [{ email: email.toLowerCase() }, { username: username.toLowerCase() }]
    });

    if (foundUser) {
      const message = {};
      if (foundUser.username === username.toLowerCase())
        message.username = 'Username is already taken';
      if (foundUser.email === email.toLowerCase()) message.email = 'Email already exist';

      return dataResponse.error(response, 409, message);
    }

    const newUser = new User();
    const hashedPassword = await newUser.generateHash(password);

    const createdUser = await newUser.set({ username, email, password: hashedPassword }).save();

    if (createdUser)
      return generateToken(
        createdUser,
        request,
        dataResponse,
        response,
        201,
        'Signup is successful'
      );
    return dataResponse.error(response, 400, dataResponse.generalError);
  } catch (error) {
    return dataResponse.error(response, 500, dataResponse.internalError);
  }
};
