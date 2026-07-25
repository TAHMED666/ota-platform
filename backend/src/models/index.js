const sequelize = require('../config/database');

const User = require('./user')(sequelize);
const Flight = require('./flight')(sequelize);
const Hotel = require('./hotel')(sequelize);
const FlightBooking = require('./flightBooking')(sequelize);
const HotelBooking = require('./hotelBooking')(sequelize);
const Payment = require('./payment')(sequelize);
const Review = require('./review')(sequelize);

User.hasMany(FlightBooking, { foreignKey: 'userId' });
User.hasMany(HotelBooking, { foreignKey: 'userId' });
User.hasMany(Payment, { foreignKey: 'userId' });
User.hasMany(Review, { foreignKey: 'userId' });

Flight.hasMany(FlightBooking, { foreignKey: 'flightId' });
Hotel.hasMany(HotelBooking, { foreignKey: 'hotelId' });

FlightBooking.belongsTo(User, { foreignKey: 'userId' });
FlightBooking.belongsTo(Flight, { foreignKey: 'flightId' });
HotelBooking.belongsTo(User, { foreignKey: 'userId' });
HotelBooking.belongsTo(Hotel, { foreignKey: 'hotelId' });

module.exports = {
  sequelize,
  User,
  Flight,
  Hotel,
  FlightBooking,
  HotelBooking,
  Payment,
  Review
};
