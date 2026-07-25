import { useEffect, useState } from 'react';
import { api } from '../services/api';

function BookingsPage() {
  const [bookings, setBookings] = useState({ flightBookings: [], hotelBookings: [] });
  const [error, setError] = useState('');

  useEffect(() => {
    api
      .getBookings()
      .then(setBookings)
      .catch((err) => setError(err.message));
  }, []);

  return (
    <main className="page">
      <h2>Your Bookings</h2>
      {error && <p className="error">{error}</p>}
      <section>
        <h3>Flight Bookings</h3>
        {bookings.flightBookings.map((booking) => (
          <article className="card" key={booking.id}>
            <p>ID: {booking.id}</p>
            <p>Status: {booking.status}</p>
            <p>
              {booking.currency} {booking.totalAmount}
            </p>
          </article>
        ))}
      </section>
      <section>
        <h3>Hotel Bookings</h3>
        {bookings.hotelBookings.map((booking) => (
          <article className="card" key={booking.id}>
            <p>ID: {booking.id}</p>
            <p>Status: {booking.status}</p>
            <p>
              {booking.currency} {booking.totalAmount}
            </p>
          </article>
        ))}
      </section>
    </main>
  );
}

export default BookingsPage;
