'use strict';
import products from './productsList.json';

export default {
  handler: async () => ({
    statusCode: 200,
    body: JSON.stringify(products),
    headers: {
      'Access-Control-Allow-Origin': '*',
    }
  })
};
