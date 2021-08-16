import lambdaTester from 'lambda-tester';
import { handler } from '../../product-service/getProductsList';
import { IResponse } from '../../product-service/types/Response';

describe('getProductsList', () => {
  it('should return data', () => {
    try {
      return lambdaTester(handler)
          .expectResult(({ statusCode, body }: IResponse) => {
            expect(statusCode).toEqual(200);
            expect(body).toBeDefined();
            expect(body.length).toBeGreaterThan(0);
          });
    } catch (e) {
      console.error(e);
    }
  });
});
