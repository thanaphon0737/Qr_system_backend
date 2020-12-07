function customerTable(sequelize) {
	const { customer, table } = sequelize.models;

	table.hasOne(customer,{foreignKey:'table_id'});
	customer.belongsTo(table,{foreignKey:'table_id'});
}

function roleEmployee(sequelize){
    const {role, employee} = sequelize.models;
    role.hasMany(employee, {foreignKey:'role_id'});
    employee.belongsTo(role, {foreignKey:'role_id'});
}

function customerOrder(sequelize){
    const {customer, order} = sequelize.models;
    customer.hasMany(order, {foreignKey:'customer_id'});
    order.belongsTo(customer,{foreignKey:'customer_id'})
}

function orderStatusOrder(sequelize){
    const { orderStatus, order} = sequelize.models;
    orderStatus.hasMany(order, {foreignKey:'order_status_id'});
    order.belongsTo(orderStatus, {foreignKey:'order_status_id'});
}

function orderToOrderProduct(sequelize){
    const {order, orderProduct} = sequelize.models;
    order.hasMany(orderProduct, {foreignKey:'order_id'});
    orderProduct.belongsTo(order,{foreignKey:'order_id'});
}

function discountOrder(sequelize){
    const {discount, order} = sequelize.models;
    discount.hasMany(order, {foreignKey:'discount_id'});
    order.belongsTo(discount, {foreignKey:'discount_id'});
}

function discountTypeTodiscount(sequelize){
    const { discountType, discount} = sequelize.models;
    discountType.hasMany(discount, {foreignKey:'discount_type_id'});
    discount.belongsTo(discountType, {foreignKey:'dicount_type_id'});
}

function orderProductStatusToOrderProduct(sequelize){
    const { orderProductStatus, orderProduct} = sequelize.models;
    orderProductStatus.hasMany(orderProduct, {foreignKey:'order_product_status_id'});
    orderProduct.belongsTo(orderProductStatus, {foreignKey:'order_product_status_id'});
}

function productToOrderProduct(sequelize){
    const { product, orderProduct} = sequelize.models;
    product.hasMany(orderProduct, {foreignKey:'product_id'});
    orderProduct.belongsTo(product, {foreignKey:'product_id'});

}

function productTypeToProduct(sequelize){
    const {productType, product} = sequelize.models;
    productType.hasMany(product, {foreignKey:'product_type_id'});
    product.belongsTo(productType, {foreignKey:'product_type_id'});
}

function productTostockInProduct(sequelize){
    const {product, stockInProduct} = sequelize.models;
    product.hasMany(stockInProduct, {foreignKey:'product_id'});
    stockInProduct.belongsTo(product, {foreignKey:'product_id'});
}

function stockInTostockInProduct(sequelize){
    const {stockIn, stockInProduct} = sequelize.models;
    stockIn.hasMany(stockInProduct, {foreignKey:'stockin_id'});
    stockInProduct.belongsTo(stockIn, {foreignKey:'stockin_id'});
}
module.exports = { customerTable, roleEmployee,customerOrder,orderStatusOrder,
orderToOrderProduct,discountOrder,discountTypeTodiscount,orderProductStatusToOrderProduct
,productToOrderProduct, productTypeToProduct,productTostockInProduct,stockInTostockInProduct};