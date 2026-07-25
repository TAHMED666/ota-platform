const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define(
    'User',
    {
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
      name: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: false, unique: true },
      passwordHash: { type: DataTypes.STRING, allowNull: false },
      role: { type: DataTypes.ENUM('user', 'admin'), defaultValue: 'user' },
      preferredCurrency: { type: DataTypes.STRING(3), defaultValue: 'USD' }
    },
    { tableName: 'users', timestamps: true }
  );
};
