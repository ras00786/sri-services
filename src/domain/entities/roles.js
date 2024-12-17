const database = require('../../infra/database/db_connection');

const sequelize = database.sequelize;
const DataTypes = database.DataTypes;

const Role = sequelize.define('roles', {
    role_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    role_name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
  }, {
    timestamps: false,
    tableName: 'Roles',
  });
  
  module.exports = Role;
  