
require('dotenv').config();

module.exports = {

  "development": {
    "username": process.env.MYSQL_USER,
    "password": process.env.MYSQL_KEY,
    "database": process.env.MYSQL_DBNAME,
    "host": process.env.MYSQL_HOST,
    "port": process.env.MYSQL_PORT || 3306,
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": 0420,
    "database": "betsdb",
    "host": "127.0.0.1",
    "port": 3306,
    "dialect": "mysql"
  },
  "production": {
    "use_env_variable": "JAWSDB_URL",
    "dialect": "mysql",
    "pool": {
      "max": 5,
      "min": 0,
      "idle": 10000
    }
  }
}
