import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png'; // Replace with your actual logo path (e.g., astronaut image)

function Navbar() {
  const [role, setRole] = useState('player'); // Mock role (replace with auth)

  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="logo-container">
          <img src={logo} alt="Victory Vault Logo" className="logo" />
          <span className="logo-text">Victory Vault</span>
        </Link>
        <div className="nav-links">
          <Link to="/">Home</Link>
          {role === 'player' && (
            <>
              <Link to="/teams">Teams</Link>
              <Link to="/dashboard">Dashboard</Link>
              <Link to="/player-profile">Player Profile</Link> {/* Added for Player role */}
            </>
          )}
          {role === 'organizer' && (
            <>
              <Link to="/dashboard">Dashboard</Link>
            </>
          )}
          {role === 'admin' && (
            <>
              <Link to="/dashboard">Dashboard</Link>
            </>
          )}
          <Link to="/leaderboard">Leaderboard</Link>
          <Link to="/login">Login</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;