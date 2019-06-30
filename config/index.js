import * as dotenv from 'dotenv';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();

if (!envFound) {
  throw new Error("⚠️ Couldn't find .env file");
}

export default {

  name: process.env.SERVER_NAME,

  port: parseInt(process.env.PORT, 10),

  databaseURL: process.env.MONGODB_URI,

  agenda: {
    dbCollection: process.env.AGENDA_DB_COLLECTION,
    pooltime: process.env.AGENDA_POOL_TIME,
    concurrency: process.env.AGENDA_CONCURRENCY,
  },

  token: process.env.SECRET_TOKEN,
  
  api: {
    prefix: '/api',
  },

};