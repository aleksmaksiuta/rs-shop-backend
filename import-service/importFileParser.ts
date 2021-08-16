import { APIGatewayEvent, Handler } from 'aws-lambda';
import logger from '../product-service/logger';

export const handler: Handler = async (event: APIGatewayEvent) => {
  try {
    logger('importFileParser', event);

    return {
      body: {},
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    };
  } catch (e) {
    return {
      body: {
        error: e.name,
      },
      statusCode: e.statusCode,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    };
  }
};
