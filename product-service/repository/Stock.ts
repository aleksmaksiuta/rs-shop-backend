import db from './db';
import { IStock } from '../types/Stock';
import InternalServerError from '../InternalServerError';

const createOne = async (stock: IStock) => {
  const client = await db();

  try {
    const {
          product_id,
          count,
      } = stock;

    const { rows } = await client.query(`
        insert into stock
            (product_id, count)
        values
            ('${product_id}', ${count})
      `);

    return rows[0];
  } catch (e) {
    throw new InternalServerError(e.message);
  } finally {
    client.end();
  }
};

export default {
  createOne,
};
