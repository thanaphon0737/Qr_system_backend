const Sequelize = require("sequelize");
const sequelize = require("./../db_instance");

const order = sequelize.define(
    "order",
    {
        orderId: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        date: {
            type: Sequelize.DATE,
            allowNull: false,
        },
        status: {
            type: Sequelize.STRING,
            allowNull: false,
            defaultValue: "-"
        },
        customerId: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        totalPrice: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0
        }
    },
    {
        // options
    }
);
(async () => {
    await customer.sync({ force: false });
})();

module.exports = order;