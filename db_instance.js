const Sequelize = require("sequelize");
// const sequelize = new Sequelize({
//   dialect: "sqlite",
//   storage: "./database.sqlite",
//   logging: false
// });

// const sequelize = new Sequelize({
//   username: "postgres",
//   password: "1234",
//   database: "postgres",
//   host:"127.0.0.1",
//   post:5432,
//   dialect: "postgres",
//   logging: false
// });
const db_host = process.env.DB_HOST || 'localhost';
const sequelize = new Sequelize('qrsystemT1', 'root', '1234', {
  host: db_host,
  dialect: 'mariadb',
  logging: false,
  port: 3306,  
})

async () => {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
};

module.exports = sequelize;