const { sequelize, DataTypes } = require('../../infra/database/db_connection');

const CartItem = sequelize.define('cartitems', {
    cart_item_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    cart_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Cart',
        key: 'cart_id',
      },
      allowNull: false,
    },
    product_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Products',
        key: 'product_id',
      },
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    timestamps: false,
    tableName: 'cartitems',
  });
  
  module.exports = CartItem;
  