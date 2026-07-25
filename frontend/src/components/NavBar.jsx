import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <header className="nav">
      <h1>OTA Platform</h1>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/flights">Flights</Link>
        <Link to="/hotels">Hotels</Link>
        <Link to="/bookings">Bookings</Link>
        <Link to="/checkout">Checkout</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/admin">Admin</Link>
        <Link to="/login">Login</Link>
      </nav>
    </header>
  );
}

export default NavBar;
