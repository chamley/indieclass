const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const { mockdb } = require('../datamock');
const basename = path.basename(__filename);
const db = {};
require('dotenv').config();

const database = 'indieclass';
const sequelize = new Sequelize(
  `${database}`,
  process.env.POSTGRESQL_USER_NAME,
  '',
  {
    host: 'localhost',
    dialect: 'postgres',
    logging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    operatorsAliases: false,
  }
);

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    console.log(db[modelName]);
    db[modelName].associate(db);
  }
});

mockdb(db);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
