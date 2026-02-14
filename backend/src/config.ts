import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const config = {
  PORT: Number(process.env.PORT) || 3000,
  DB_ADDRESS: process.env.DB_ADDRESS || 'mongodb://127.0.0.1:27017/weblarek',
  UPLOAD_PATH: process.env.UPLOAD_PATH || 'images',
  UPLOAD_PATH_TEMP: process.env.UPLOAD_PATH_TEMP || 'temp',
  ORIGIN_ALLOW: process.env.ORIGIN_ALLOW || 'http://localhost:5173',
  AUTH_REFRESH_TOKEN_EXPIRY: process.env.AUTH_REFRESH_TOKEN_EXPIRY || '7d',
  AUTH_ACCESS_TOKEN_EXPIRY: process.env.AUTH_ACCESS_TOKEN_EXPIRY || '10m',
  ACCESS_KEY: process.env.ACCESS_KEY || 'some-secret-access-key',
  REFRESH_KEY: process.env.REFRESH_KEY || 'some-secret-refresh-key',
};

export default config;
