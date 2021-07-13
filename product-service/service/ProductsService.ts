import productsMock from '../products.mock';

const getAll = (): Promise<any> => new Promise((resolve) => {
  resolve(productsMock);
});

const getById = (productId: string): Promise<any> => new Promise((resolve) => {
  const productFound = productsMock.find(({ id }) => id === productId);
  resolve(productFound);
});

export default {
  getAll,
  getById,
};
