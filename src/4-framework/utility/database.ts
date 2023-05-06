import { Sequelize, Options } from 'sequelize'
const pg = require('pg');

const db = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  userName: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
}

console.log('logging db variables');
console.log(process.env.DB_HOST);
console.log(process.env.DB_PORT);
console.log(process.env.DB_NAME);
console.log(process.env.DB_USER);

const dbConnection: Options = {
  dialect: 'postgres',
  host: db.host,
  dialectModule: pg,
  port: Number(db.port),
  username: db.userName,
  password: db.password,
  database: db.database,
  pool: {
    max: 2,
    min: 0,
    idle: 0,
    acquire: 3000,
    evict: 60,
  },
}

export const sequelize = new Sequelize(dbConnection)
