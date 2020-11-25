const Sequelize = require("sequelize");
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite",
  logging: false
});

(async () => {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
})();

module.exports = sequelize;