import jwt from 'jsonwebtoken';
import dotEnv from 'dotenv';

dotEnv.config();

export default (user, request, dataResponse, response, statusCode, message) => {
  const payload = { id: user._id, email: user.email };

  const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: 3600 });

  request.token = token;

  dataResponse.success(response, statusCode, message, token);
};
