import lambdaTester from 'lambda-tester';
import { handler } from '../../product-service/getProductsById';
import { handler as getAllProducts } from '../../product-service/getProductsList';
import { IResponse } from '../../product-service/types/Response';

describe('getProductsById', () => {
  it('should return 404', () => {
    try {
      return lambdaTester(handler)
          .event({ pathParameters: '' })
          .expectResult(({ statusCode }: IResponse) => {
            expect(statusCode).toEqual(404);
          });
    } catch (e) {
      console.error(e);
    }
  });

  it('should return item', async () => {
    try {
      const event = { body: {} };
      const context: any = {};
      const cb = () => {};

      const { body }: any = await getAllProducts(event, context, cb);

      const data = JSON.parse(body);

      return lambdaTester(handler)
        .event({
          pathParameters: {
            productId: data[0].id,
          },
        })
        .expectResult(({ statusCode, body }: IResponse) => {
          expect(statusCode).toEqual(200);
          expect(body).toBeDefined();
          expect(body.id === data[0].id);
        });
    } catch (e) {
      console.error(e);
    }
  });
});
