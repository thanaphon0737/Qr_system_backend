const Sequelize = require("sequelize");
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite",
  logging: false
});

// const sequelize = new Sequelize({
//   username: "postgres",
//   password: "1234",
//   database: "QOFR_db",
//   host:"127.0.0.1",
//   post:5432,
//   dialect: "postgres",
//   logging: false
// });



(async () => {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
})();

module.exports = sequelize;