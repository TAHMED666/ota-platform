const { User, Flight, Hotel, FlightBooking, HotelBooking, Payment } = require('../models');

const getDashboard = async (req, res, next) => {
  try {
    const [users, flights, hotels, flightBookings, hotelBookings, payments] = await Promise.all([
      User.count(),
      Flight.count(),
      Hotel.count(),
      FlightBooking.count(),
      HotelBooking.count(),
      Payment.count()
    ]);

    return res.json({
      users,
      flights,
      hotels,
      flightBookings,
      hotelBookings,
      payments
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = { getDashboard };
