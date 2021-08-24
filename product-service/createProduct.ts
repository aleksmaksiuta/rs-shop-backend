'use strict';
import { APIGatewayEvent, Handler } from 'aws-lambda';
import { Products } from './services';
import logger from './logger';

export const handler: Handler = async (event: APIGatewayEvent) => {
  try {
    logger('createProduct', event);
    const product: any = event.body;
    const productId = await Products.createOne(product);

    return {
      body: JSON.stringify({
        id: productId,
      }),
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    };
  } catch (e) {
    return {
      body: JSON.stringify({
        error: e.name,
      }),
      statusCode: e.statusCode,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    };
  }
};
