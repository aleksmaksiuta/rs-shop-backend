import lambdaTester from 'lambda-tester';
import { handler } from '../../product-service/getProductsById';
import productsMock from '../../product-service/products.mock';

describe('getProductsById', () => {
  it('should return 404', () => {
    try {
      return lambdaTester(handler)
          .event({ pathParameters: '' })
          .expectResult(({ statusCode }) => {
            expect(statusCode).toEqual(404);
          });
    } catch (e) {
      console.error(e);
    }
  });

  it('should return item', () => {
    try {
      const expected = productsMock[0];
      return lambdaTester(handler)
      .event({
        pathParameters: {
          productId: expected.id,
        },
      })
      .expectResult(({ statusCode, body }) => {
        expect(statusCode).toEqual(200);
        expect(body).toBeDefined();
        expect(body.id === expected.id);
      });
    } catch (e) {
      console.error(e);
    }
  });
});
