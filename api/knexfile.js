// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

const HOST = process.env.DATABASE_HOST || '127.0.0.1';
const USER = process.env.POSTGRES_USER || 'postgres';
const PASS = process.env.POSTGRES_PASS || 'docker';
const DB = process.env.POSTGRES_DB || 'docker_db';
const PORT = process.env.PORT || 5432;

module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      host: HOST,
      user: USER,
      password: PASS,
      database: DB,
      port: PORT
    }
  },
  production: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL+'?ssl=no-verify',
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds'
    }
  }
};
