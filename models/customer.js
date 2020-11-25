const Sequelize = require("sequelize");
const sequelize = require("./../db_instance");

const customer = sequelize.define(
    "customer",
    {
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            primaryKey: true
        },
        url_image:{
            type: Sequelize.STRING,
            allowNull: false,
            defaultValue: "-"
        }
    },
    {
        // options
    }
);

(async () => {
    await customer.sync({ force: false });
})();

module.exports = customer;