const {Sequelize} = require('sequelize');
const { config } = require('./../config/config.js');
const setupModels = require('./../db/models');


const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

const sequelize = new Sequelize(URI,
  {
    dialect: 'postgres',
    logging: true,
  }
);

setupModels(sequelize);

sequelize.sync({force: false}).then(()=>{
  console.log("Database sync");
}).catch((err)=>{
  console.log(err);
});

module.exports = sequelize;
