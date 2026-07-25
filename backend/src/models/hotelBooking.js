const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define(
    'HotelBooking',
    {
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
      userId: { type: DataTypes.UUID, allowNull: false },
      hotelId: { type: DataTypes.UUID, allowNull: false },
      checkInDate: { type: DataTypes.DATEONLY, allowNull: false },
      checkOutDate: { type: DataTypes.DATEONLY, allowNull: false },
      guests: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
      rooms: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
      status: {
        type: DataTypes.ENUM('pending', 'confirmed', 'cancelled'),
        defaultValue: 'pending'
      },
      totalAmount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
      currency: { type: DataTypes.STRING(3), defaultValue: 'USD' }
    },
    { tableName: 'hotel_bookings', timestamps: true }
  );
};
