'use strict';
import { APIGatewayEvent, Handler } from 'aws-lambda';
import { Products } from './services';

export const handler: Handler = async (event: APIGatewayEvent) => {
  try {
    const product: any = event.body;
    const productId = await Products.createOne(product);

    return {
      body: {
        id: productId,
      },
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    };
  } catch (e) {
    console.log(e.message);
  }
};
