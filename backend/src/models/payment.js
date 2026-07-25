const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define(
    'Payment',
    {
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
      userId: { type: DataTypes.UUID, allowNull: false },
      bookingType: { type: DataTypes.ENUM('flight', 'hotel'), allowNull: false },
      bookingId: { type: DataTypes.UUID, allowNull: false },
      stripePaymentIntentId: { type: DataTypes.STRING },
      amount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
      currency: { type: DataTypes.STRING(3), defaultValue: 'USD' },
      status: {
        type: DataTypes.ENUM('pending', 'succeeded', 'failed', 'refunded'),
        defaultValue: 'pending'
      }
    },
    { tableName: 'payments', timestamps: true }
  );
};
