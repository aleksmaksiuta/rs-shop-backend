import NotFoundError from '../NotFoundError';
import { Products } from '../repository';
import { IProduct } from '../types/Product';
import { Stock } from './index';
import InvalidDataError from '../InvalidDataError';

const getAll = async (): Promise<[IProduct]> => Products.getAll();

const getById = async (productId: string): Promise<IProduct> => {
  if (!productId) {
    throw new NotFoundError();
  }

  const productFound = await Products.getOne({ id: productId });

  if (!productFound) {
    throw new NotFoundError();
  }

  return productFound;
};

// todo add transaction
const createOne = async (product: IProduct):Promise<string> => {
  if (!product.title) {
    throw new InvalidDataError();
  }

  const productId = await Products.createOne(product);

  await Stock.createOne({ product_id: productId, count: product.count });

  return productId;
};

export default {
  getAll,
  getById,
  createOne,
};
