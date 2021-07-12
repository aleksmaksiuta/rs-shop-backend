'use strict';
const products = require('./productsList.json');

module.exports.handler = async (event) => {
  const { productId } = event.pathParameters;

  const productFound = products.find(({ id }) => id === productId);

  if (!productFound) {
    return {
      statusCode: 404,
      headers: {
        'Access-Control-Allow-Origin': '*',
      }
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify(productFound),
    headers: {
      'Access-Control-Allow-Origin': '*',
    }
  }
};