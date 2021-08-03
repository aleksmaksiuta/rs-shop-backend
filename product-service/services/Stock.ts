import { IStock } from '../types/Stock';
import { Stock } from '../repository';

const createOne = async (stock: IStock) => Stock.createOne(stock);

export default {
  createOne,
};
