const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define(
    'Hotel',
    {
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
      name: { type: DataTypes.STRING, allowNull: false },
      city: { type: DataTypes.STRING, allowNull: false },
      country: { type: DataTypes.STRING, allowNull: false },
      description: { type: DataTypes.TEXT },
      rating: { type: DataTypes.DECIMAL(2, 1), defaultValue: 0 },
      pricePerNight: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
      currency: { type: DataTypes.STRING(3), defaultValue: 'USD' },
      roomsAvailable: { type: DataTypes.INTEGER, defaultValue: 0 }
    },
    { tableName: 'hotels', timestamps: true }
  );
};
