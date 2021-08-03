import NotFoundError from '../NotFoundError';
import { Products } from '../repository';
import { IProduct } from '../types/Product';
import { Stock } from './index';

const getAll = async (): Promise<[IProduct]> => {
  const p = await Products.getAll();

  return p;
};

const getById = async (productId: string): Promise<IProduct> => {
  if (!productId) {
    throw new NotFoundError('Not Found');
  }

  const productFound = await Products.getOne({ id: productId });

  if (!productFound) {
    throw new NotFoundError('Not Found');
  }

  return productFound;
};

const createOne = async (product: IProduct):Promise<string> => {
  const productId = await Products.createOne(product);

  await Stock.createOne({ product_id: productId, count: product.count });

  return productId;
};

export default {
  getAll,
  getById,
  createOne,
};
