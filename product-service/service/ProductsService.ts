import productsMock from '../products.mock';
import NotFoundError from '../NotFoundError';

const getAll = async (): Promise<any> => productsMock;

const getById = async (productId: string): Promise<any> => {
  const productFound = productsMock.find(({ id }) => id === productId);

  if (!productFound) {
    throw new NotFoundError('Not Found');
  }

  return productFound;
};

export default {
  getAll,
  getById,
};
