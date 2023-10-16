
const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  dbUser: process.env.DB_USER || 'chaqui', //para postgres
  //dbUser: process.env.DB_USER || 'root', //para mysql
  dbPassword: process.env.DB_PASSWORD || 'admin123',
  dbHost: process.env.DB_HOST || 'localhost',
  dbName: process.env.DB_NAME || 'my_store',
  dbPort: process.env.DB_PORT || 5432, //para postgres
  //dbPort: process.env.DB_PORT || 3306, //para mysql
  apiKey: process.env.API_KEY || '123'
}

module.exports = { config };
