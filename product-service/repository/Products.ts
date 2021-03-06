import db from './db';
import { IProduct } from '../types/Product';
import InternalServerError from '../InternalServerError';

const getAll = async (): Promise<[IProduct]> => {
  const client = await db();

  try {
    const { rows }: any = await client.query(`
            select p.id, p.title, p.description, p.price, s.count from products p
                join stock s
                on p.id = s.product_id
        `);

    return rows;
  } catch (e) {
    throw new InternalServerError(e.message);
  } finally {
    client.end();
  }
};

const getOne = async ({ id }: { id: string }): Promise<IProduct> => {
  const client = await db();

  try {
    const { rows } = await client.query(`
            select p.id, p.title, p.description, p.price, s.count from products p
                join stock s
                on p.id = s.product_id
                where p.id = '${id}'
        `);

    return rows[0];
  } catch (e) {
    throw new InternalServerError(e.message);
  } finally {
    client.end();
  }
};

const createOne = async (product: IProduct): Promise<any> => {
  const client = await db();

  try {
    const {
      title, description, price,
    } = product;

    const { rows }: any = await client.query(`
            insert into products
            (title, description, price)
            values
            ('${title}', '${description}', ${price})
            returning *
        `);

    return rows[0];
  } catch (e) {
    throw new InternalServerError(e.message);
  } finally {
    client.end();
  }
};

export default {
  getAll,
  getOne,
  createOne,
};
