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

const sequelize = new Sequelize('qrsystem5', 'root', '1234', {
  dialect: 'mariadb',
  logging: false

})

async () => {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
};

module.exports = sequelize;