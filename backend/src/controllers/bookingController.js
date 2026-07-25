const { FlightBooking, HotelBooking, Flight, Hotel } = require('../models');

const getMyBookings = async (req, res, next) => {
  try {
    const [flightBookings, hotelBookings] = await Promise.all([
      FlightBooking.findAll({ where: { userId: req.user.id }, include: [Flight] }),
      HotelBooking.findAll({ where: { userId: req.user.id }, include: [Hotel] })
    ]);

    return res.json({ flightBookings, hotelBookings });
  } catch (error) {
    return next(error);
  }
};

module.exports = { getMyBookings };
