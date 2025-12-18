export const config = {
  PORT: Number(process.env.PORT) || 3000,
  DB_ADDRESS: process.env.DB_ADDRESS || 'mongodb://127.0.0.1:27017/weblarek',
  UPLOAD_PATH: process.env.UPLOAD_PATH || 'images',
  UPLOAD_PATH_TEMP: process.env.UPLOAD_PATH_TEMP || 'temp',
  ORIGIN_ALLOW: process.env.ORIGIN_ALLOW || 'http://localhost:5173',
  AUTH_REFRESH_TOKEN_EXPIRY: process.env.AUTH_REFRESH_TOKEN_EXPIRY || '7d',
  AUTH_ACCESS_TOKEN_EXPIRY: process.env.AUTH_ACCESS_TOKEN_EXPIRY || '1m'
}