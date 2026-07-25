const { Op } = require('sequelize');
const { Hotel, HotelBooking } = require('../models');
const { convertPrice } = require('../services/currencyService');
const { sendBookingEmail } = require('../services/emailService');

const searchHotels = async (req, res, next) => {
  try {
    const { city, country, currency = 'USD' } = req.query;
    const where = {};

    if (city) {
      where.city = { [Op.iLike]: `%${city}%` };
    }

    if (country) {
      where.country = { [Op.iLike]: `%${country}%` };
    }

    const hotels = await Hotel.findAll({ where, order: [['rating', 'DESC']] });

    return res.json(
      hotels.map((hotel) => ({
        ...hotel.toJSON(),
        displayPricePerNight: convertPrice(hotel.pricePerNight, hotel.currency, currency),
        displayCurrency: currency
      }))
    );
  } catch (error) {
    return next(error);
  }
};

const bookHotel = async (req, res, next) => {
  try {
    const {
      hotelId,
      checkInDate,
      checkOutDate,
      guests = 1,
      rooms = 1,
      currency = 'USD'
    } = req.body;

    const hotel = await Hotel.findByPk(hotelId);

    if (!hotel) {
      return res.status(404).json({ message: 'Hotel not found' });
    }

    if (hotel.roomsAvailable < rooms) {
      return res.status(400).json({ message: 'Not enough rooms available' });
    }

    const nights = Math.max(1, Math.ceil((new Date(checkOutDate) - new Date(checkInDate)) / 86400000));
    const totalAmount = convertPrice(Number(hotel.pricePerNight) * nights * rooms, hotel.currency, currency);

    const booking = await HotelBooking.create({
      userId: req.user.id,
      hotelId,
      checkInDate,
      checkOutDate,
      guests,
      rooms,
      totalAmount,
      currency,
      status: 'pending'
    });

    await hotel.decrement({ roomsAvailable: rooms });

    await sendBookingEmail({
      to: req.user.email,
      subject: 'Hotel booking created',
      body: `Booking ${booking.id} has been created.`
    });

    return res.status(201).json(booking);
  } catch (error) {
    return next(error);
  }
};

module.exports = { searchHotels, bookHotel };
