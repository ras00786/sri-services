const User = require('./entities/user');
const Role = require('./entities/roles');
const Product = require('./entities/product');
const Category = require('./entities/category');
const Order = require('./entities/order');
const OrderItem = require('./entities/order_Items');
const Cart = require('./entities/cart');
const CartItem = require('./entities/cart_Items');
const UserAddress = require('./entities/user_Addresses');

// Users and Addresses
User.hasMany(UserAddress, { foreignKey: 'user_id' });
UserAddress.belongsTo(User, { foreignKey: 'user_id' });

// Users and Orders
User.hasMany(Order, { foreignKey: 'user_id' });
Order.belongsTo(User, { foreignKey: 'user_id' });

// Users and Carts
User.hasMany(Cart, { foreignKey: 'user_id' });
Cart.belongsTo(User, { foreignKey: 'user_id' });

// Categories and Products
Category.hasMany(Product, { foreignKey: 'category_id' });
Product.belongsTo(Category, { foreignKey: 'category_id' });

// Users and Products (Seller relationship)
User.hasMany(Product, { foreignKey: 'seller_id' });
Product.belongsTo(User, { foreignKey: 'seller_id' });

// Orders and OrderItems
Order.hasMany(OrderItem, { foreignKey: 'order_id' });
OrderItem.belongsTo(Order, { foreignKey: 'order_id' });

// Products and OrderItems
Product.hasMany(OrderItem, { foreignKey: 'product_id' });
OrderItem.belongsTo(Product, { foreignKey: 'product_id' });

// Carts and CartItems
Cart.hasMany(CartItem, { foreignKey: 'cart_id' });
CartItem.belongsTo(Cart, { foreignKey: 'cart_id' });

// Products and CartItems
Product.hasMany(CartItem, { foreignKey: 'product_id' });
CartItem.belongsTo(Product, { foreignKey: 'product_id' });

module.exports = { 
  User, 
  Role, 
  Product, 
  Category, 
  Order, 
  OrderItem, 
  Cart, 
  CartItem, 
  UserAddress 
};
