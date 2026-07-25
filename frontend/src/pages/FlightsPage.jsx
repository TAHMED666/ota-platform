import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { api } from '../services/api';

function FlightsPage() {
  const location = useLocation();
  const [flights, setFlights] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    api
      .getFlights(searchParams.toString())
      .then(setFlights)
      .catch((err) => setError(err.message));
  }, [location.search]);

  return (
    <main className="page">
      <h2>Flight Results</h2>
      {error && <p className="error">{error}</p>}
      {flights.map((flight) => (
        <article className="card" key={flight.id}>
          <h3>
            {flight.departureCity} → {flight.arrivalCity}
          </h3>
          <p>
            {flight.airline} ({flight.flightNumber})
          </p>
          <p>
            {flight.displayCurrency} {flight.displayPrice}
          </p>
        </article>
      ))}
    </main>
  );
}

export default FlightsPage;
