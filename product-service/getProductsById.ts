'use strict';
import { Handler, APIGatewayEvent } from 'aws-lambda';
import { Products } from './services';
import logger from './logger';

export const handler: Handler = async (event: APIGatewayEvent) => {
  try {
    logger('getProductsById', event);
    const { productId }: any = event.pathParameters;
    const productFound = await Products.getById(productId);

    return {
      statusCode: 200,
      body: JSON.stringify(productFound),
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    };
  } catch (e) {
    return {
      statusCode: e.statusCode,
      message: e.name,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    };
  }
};
