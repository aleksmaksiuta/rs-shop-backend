'use strict';
import { APIGatewayEvent, Handler } from 'aws-lambda';
import { Products } from './services';
import logger from './logger';

export const handler: Handler = async (event: APIGatewayEvent) => {
  try {
    logger('getProductsList', event);
    const products = await Products.getAll();

    return {
      statusCode: 200,
      body: JSON.stringify(products),
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    };
  } catch (e) {
    console.log(e.message);
  }
};
