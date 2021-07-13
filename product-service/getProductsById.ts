'use strict';
import { Handler } from 'aws-lambda';
import ProductsService from './service/ProductsService';

export const handler: Handler = async (event: any) => {
  try {
    const { productId } = event.pathParameters;
    const productFound = await ProductsService.getById(productId);

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
