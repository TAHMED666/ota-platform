import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { api } from '../services/api';

function HotelsPage() {
  const location = useLocation();
  const [hotels, setHotels] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    api
      .getHotels(searchParams.toString())
      .then(setHotels)
      .catch((err) => setError(err.message));
  }, [location.search]);

  return (
    <main className="page">
      <h2>Hotel Results</h2>
      {error && <p className="error">{error}</p>}
      {hotels.map((hotel) => (
        <article className="card" key={hotel.id}>
          <h3>{hotel.name}</h3>
          <p>
            {hotel.city}, {hotel.country}
          </p>
          <p>
            {hotel.displayCurrency} {hotel.displayPricePerNight} / night
          </p>
        </article>
      ))}
    </main>
  );
}

export default HotelsPage;
