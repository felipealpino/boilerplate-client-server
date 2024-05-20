import dotenv from 'dotenv';

dotenv.config();

export const appConfiguration = {
  pgDbConnectionString: `postgres://${process.env.DBUSER}:${process.env.DBPASSWORD}@${process.env.DBHOST}:${process.env.DBPORT}/${process.env.DBDATABASE}`,
  port: process.env.PORT || 2525,
  host: '0.0.0.0',
  corsOrigin: 'http://localhost:3000',
};
