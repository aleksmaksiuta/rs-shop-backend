'use strict';
import { Handler } from 'aws-lambda';
import ProductsService from './service/ProductsService';

export const handler: Handler = async (event: any) => {
  const { productId } = event.pathParameters;

  const productFound = await ProductsService.getById(productId);

  if (!productFound) {
    return {
      statusCode: 404,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(productFound),
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  };
};
