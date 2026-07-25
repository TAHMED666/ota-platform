import { useHistory } from 'react-router-dom';
import { useState } from 'react';

function HomePage() {
  const history = useHistory();
  const [flightQuery, setFlightQuery] = useState({ departureCity: '', arrivalCity: '' });
  const [hotelQuery, setHotelQuery] = useState({ city: '', country: '' });

  return (
    <main className="page">
      <h2>Search Your Next Trip</h2>
      <section className="grid">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const params = new URLSearchParams(flightQuery).toString();
            history.push(`/flights?${params}`);
          }}
        >
          <h3>Flight Search</h3>
          <input
            placeholder="Departure city"
            value={flightQuery.departureCity}
            onChange={(e) => setFlightQuery({ ...flightQuery, departureCity: e.target.value })}
          />
          <input
            placeholder="Arrival city"
            value={flightQuery.arrivalCity}
            onChange={(e) => setFlightQuery({ ...flightQuery, arrivalCity: e.target.value })}
          />
          <button type="submit">Find Flights</button>
        </form>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            const params = new URLSearchParams(hotelQuery).toString();
            history.push(`/hotels?${params}`);
          }}
        >
          <h3>Hotel Search</h3>
          <input placeholder="City" value={hotelQuery.city} onChange={(e) => setHotelQuery({ ...hotelQuery, city: e.target.value })} />
          <input
            placeholder="Country"
            value={hotelQuery.country}
            onChange={(e) => setHotelQuery({ ...hotelQuery, country: e.target.value })}
          />
          <button type="submit">Find Hotels</button>
        </form>
      </section>
    </main>
  );
}

export default HomePage;
