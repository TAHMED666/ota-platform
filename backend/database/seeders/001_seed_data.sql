INSERT INTO flights (
  airline,
  flight_number,
  departure_city,
  arrival_city,
  departure_time,
  arrival_time,
  price,
  currency,
  seats_available,
  created_at,
  updated_at
)
VALUES
  ('SkyWays', 'SW101', 'Dhaka', 'Dubai', NOW() + INTERVAL '2 day', NOW() + INTERVAL '2 day 5 hour', 450, 'USD', 40, NOW(), NOW()),
  ('AirBlue', 'AB202', 'London', 'Paris', NOW() + INTERVAL '1 day', NOW() + INTERVAL '1 day 2 hour', 180, 'USD', 32, NOW(), NOW());

INSERT INTO hotels (
  name,
  city,
  country,
  description,
  rating,
  price_per_night,
  currency,
  rooms_available,
  created_at,
  updated_at
)
VALUES
  ('Grand Dhaka', 'Dhaka', 'Bangladesh', 'Business friendly city hotel', 4.5, 120, 'USD', 15, NOW(), NOW()),
  ('Paris Central Inn', 'Paris', 'France', 'Near city center', 4.2, 200, 'USD', 20, NOW(), NOW());
