'use strict';
import { Handler } from 'aws-lambda';
import { Products } from './services';

export const handler: Handler = async () => {
  try {
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
