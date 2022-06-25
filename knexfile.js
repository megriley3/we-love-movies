const path = require("path");
require("dotenv").config()
const {DATABASE_URL} = process.env;
module.exports = {

  development: {
    client: 'postgresql',
    connection: DATABASE_URL,
    migrations: {directory: path.join(__dirname, "src", "db", "migrations")}, 
    seeds: {directory: path.join(__dirname, "src", "db", "seeds")}
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: DATABASE_URL,
      user:     'rlmbbwys',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: "postgresql",
    connection: DATABASE_URL,
    migrations: {
      directory: __dirname + "/src/db/migrations",
    },
    seeds: {
      directory: __dirname + "/src/db/seeds",
    },
  }
  ,

  test: {
    client: "sqlite3",
    connection: {
      filename: ":memory:",
    },
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
    useNullAsDefault: true,
  },

};
