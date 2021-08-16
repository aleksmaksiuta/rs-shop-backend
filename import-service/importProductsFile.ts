import { APIGatewayEvent, Handler } from 'aws-lambda';
import logger from '../product-service/logger';
import { getSignedUrl } from './services/getSignedUrl';

export const handler: Handler = async (event: APIGatewayEvent) => {
  try {
    logger('importProductsFile', event);

    const signedUrl = await getSignedUrl(event.queryStringParameters?.name || '');

    return {
      body: JSON.stringify(signedUrl),
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
