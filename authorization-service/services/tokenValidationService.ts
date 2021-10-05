import ForbiddenError from '../ForbiddenError';

const { AUTH_USERNAME, AUTH_PASSWORD } = process.env;

export const validateToken = (token) => {
  const encodedCredentials = token.split(' ')[1];
  const buffer = Buffer.from(encodedCredentials, 'base64');
  const [username, password] = buffer.toString('utf-8').split(':');

  if (username !== AUTH_USERNAME || password !== AUTH_PASSWORD) {
    throw new ForbiddenError();
  }
};
