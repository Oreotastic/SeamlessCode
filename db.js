const pg = require('pg')
const keys = require('./config/keys')

const connection = keys.conString.connection

const client = new pg.Client(connection)

client.connect()

const sync = async() => {

  const sql = `
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

    DROP TABLE IF EXISTS users;
  
    CREATE TABLE users(
      id UUID PRIMARY KEY DEFAULT uuid_generator_v4(),
      githubId VARCHAR UNIQUE NOT NULL,
      name VARCHAR NOT NULL
    );
  `

  await client.query(sql)
}


