import lambdaTester from 'lambda-tester';
import { handler } from '../../product-service/createProduct';
import { IProduct } from '../../product-service/types/Product';

describe('createProduct', () => {
  it('should create item', async () => {
    try {
      const data: IProduct = {
        title: 'Test',
        description: 'Test',
        count: 1,
        price: 1,
      };

      return lambdaTester(handler)
        .event({
          body: data,
        })
        .expectResult(({ statusCode, body }) => {
          console.log(body);

          expect(statusCode).toEqual(200);
          expect(body).toBeDefined();
          expect(body.id).not.toBeUndefined();
        });
    } catch (e) {
      console.error(e);
    }
  });
});
