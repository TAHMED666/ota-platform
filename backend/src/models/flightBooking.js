const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define(
    'FlightBooking',
    {
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
      userId: { type: DataTypes.UUID, allowNull: false },
      flightId: { type: DataTypes.UUID, allowNull: false },
      passengers: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
      status: {
        type: DataTypes.ENUM('pending', 'confirmed', 'cancelled'),
        defaultValue: 'pending'
      },
      totalAmount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
      currency: { type: DataTypes.STRING(3), defaultValue: 'USD' }
    },
    { tableName: 'flight_bookings', timestamps: true }
  );
};
