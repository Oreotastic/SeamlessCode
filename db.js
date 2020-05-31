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


//Selects all users from database
const getUsers = async() => {
  const sql = `SELECT * FROM users`
  const response = await client.query(sql)
  return response.rows
}

//Grabs user from database by ID
const getUser = async(id) => {
  const sql = `SELECT * FROM users WHERE id = $1`
  const response = await client.query(sql, [id])
  return response.rows[0]
}

module.exports = {
  sync,
  getUsers,
  getUser
}