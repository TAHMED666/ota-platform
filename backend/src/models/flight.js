const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define(
    'Flight',
    {
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
      airline: { type: DataTypes.STRING, allowNull: false },
      flightNumber: { type: DataTypes.STRING, allowNull: false },
      departureCity: { type: DataTypes.STRING, allowNull: false },
      arrivalCity: { type: DataTypes.STRING, allowNull: false },
      departureTime: { type: DataTypes.DATE, allowNull: false },
      arrivalTime: { type: DataTypes.DATE, allowNull: false },
      price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
      currency: { type: DataTypes.STRING(3), defaultValue: 'USD' },
      seatsAvailable: { type: DataTypes.INTEGER, defaultValue: 0 }
    },
    { tableName: 'flights', timestamps: true }
  );
};
