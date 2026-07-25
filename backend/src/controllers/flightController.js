const { Op } = require('sequelize');
const { Flight, FlightBooking } = require('../models');
const { convertPrice } = require('../services/currencyService');
const { sendBookingEmail } = require('../services/emailService');

const searchFlights = async (req, res, next) => {
  try {
    const { departureCity, arrivalCity, currency = 'USD' } = req.query;
    const where = {};

    if (departureCity) {
      where.departureCity = { [Op.iLike]: `%${departureCity}%` };
    }

    if (arrivalCity) {
      where.arrivalCity = { [Op.iLike]: `%${arrivalCity}%` };
    }

    const flights = await Flight.findAll({ where, order: [['departureTime', 'ASC']] });

    return res.json(
      flights.map((flight) => ({
        ...flight.toJSON(),
        displayPrice: convertPrice(flight.price, flight.currency, currency),
        displayCurrency: currency
      }))
    );
  } catch (error) {
    return next(error);
  }
};

const bookFlight = async (req, res, next) => {
  try {
    const { flightId, passengers = 1, currency = 'USD' } = req.body;
    const flight = await Flight.findByPk(flightId);

    if (!flight) {
      return res.status(404).json({ message: 'Flight not found' });
    }

    if (flight.seatsAvailable < passengers) {
      return res.status(400).json({ message: 'Not enough seats available' });
    }

    const totalAmount = convertPrice(Number(flight.price) * passengers, flight.currency, currency);

    const booking = await FlightBooking.create({
      userId: req.user.id,
      flightId,
      passengers,
      totalAmount,
      currency,
      status: 'pending'
    });

    await flight.decrement({ seatsAvailable: passengers });

    await sendBookingEmail({
      to: req.user.email,
      subject: 'Flight booking created',
      body: `Booking ${booking.id} has been created.`
    });

    return res.status(201).json(booking);
  } catch (error) {
    return next(error);
  }
};

module.exports = { searchFlights, bookFlight };
