import { Handler, SQSEvent } from 'aws-lambda';
import logger from '../product-service/logger';
import { EmailSender, Products } from './services';

export const handler: Handler = async (event: SQSEvent) => {
  try {
    logger('catalogBatchProcess', event);

    const promises = event.Records.map(({ body }) => {
      const product: any = JSON.parse(body);
      return Products.createOne(product);
    });

    const ids = await Promise.all(promises);
    EmailSender.productCreated(ids);

    return {
      body: 'OK',
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
