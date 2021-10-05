import { APIGatewayAuthorizerEvent, Handler } from 'aws-lambda';
import logger from '../product-service/logger';
import { validateToken } from './services/tokenValidationService';
import { generatePolicy } from './services/policyGeneratorService';
import NotAuthorizedError from './NotAuthorizedError';

const validateRequest = ({ type }) => {
  if (type !== 'TOKEN') {
    throw new NotAuthorizedError();
  }
};

export const handler: Handler = async (event: APIGatewayAuthorizerEvent, _, cb) => {
  logger('authorizer', event);

  // @ts-ignore
  const { authorizationToken: token, methodArn } = event;
  const encodedCredentials = token.split(' ')[1];
  try {
    validateRequest(event);
    validateToken(token);

    const policy = generatePolicy(encodedCredentials, methodArn, 'Allow');
    cb(null, policy);
  } catch (e) {
    const policy = generatePolicy(encodedCredentials, methodArn, 'Deny');
    cb(e, policy);
  }
};
