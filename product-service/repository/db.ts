import { Client } from 'pg';
import InternalServerError from '../ServerError';

const {
    DB_USER,
    DB_SERVER,
    DB_PASSWORD,
    DB_PORT,
    DB_DATABASE,
} = process.env;

const connectionString = `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_SERVER}:${DB_PORT}/${DB_DATABASE}`;

const config = {
  connectionString,
};

const db = async (): Promise<Client> => {
  try {
    const client = new Client(config);
    await client.connect();

    return client;
  } catch (e) {
    throw new InternalServerError();
  }
};

export default db;
