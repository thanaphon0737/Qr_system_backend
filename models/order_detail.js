const Sequelize = require("sequelize");
const sequelize = require("./../db_instance");

const order = sequelize.define(
    "order_detail",
    {
        orderId: {
            type: Sequelize.INTEGER
        },
        ProductId: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        Ordered_Qty: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        Price: {
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