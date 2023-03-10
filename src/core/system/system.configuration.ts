import { existsSync, mkdirSync } from 'fs';
import { DataSource } from 'typeorm';
export const HOME = './files';
export const VIDEOS = './files/videos';
export const IMAGES = './files/images';
export const AUDIOS = './files/audios';
export const TMP = './files/tmp';

export const SYSTEMINIT = () => {
  if (!existsSync(HOME)) {
    mkdirSync(HOME);
    mkdirSync(VIDEOS);
    mkdirSync(IMAGES);
    mkdirSync(AUDIOS);
    mkdirSync(TMP);
  }
  if (!existsSync(VIDEOS)) mkdirSync(VIDEOS);
  if (!existsSync(IMAGES)) mkdirSync(IMAGES);
  if (!existsSync(AUDIOS)) mkdirSync(AUDIOS);
  if (!existsSync(TMP)) mkdirSync(TMP);
};

export const DBCONFIG = {
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  dropSchema: process.env.DROP_SCHEMA === 'TRUE' ? true : false,
  logging: false,
  synchronize: true,
  subscribers: ['src/subscriber/**/*.ts'],
  cli: {
    entitiesDir: 'src/modules/entities',
    migrationsDir: 'src/database/migrations',
    subscribersDir: 'src/subscriber',
  },
};

export const DATASOURCE = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
});
