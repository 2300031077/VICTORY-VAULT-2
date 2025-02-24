import { useState, useEffect } from 'react'; // Added useEffect for mock login simulation
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png'; // Replace with your actual logo path (e.g., astronaut image)

function Navbar() {
  const [role, setRole] = useState('player'); // Mock role (replace with auth)
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Simulate login for demo
  const [playerName, setPlayerName] = useState(''); // Start empty, load from localStorage

  // Load player details from localStorage on mount
  useEffect(() => {
    const savedDetails = localStorage.getItem('playerDetails');
    if (savedDetails) {
      const details = JSON.parse(savedDetails);
      setPlayerName(details.name);
    }
    if (!isLoggedIn) {
      setPlayerName(''); // Reset if not logged in
    }
  }, [isLoggedIn]);

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
              <Link to="/player-profile">Player Profile</Link>
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
          {isLoggedIn ? (
            <>
              <span style={{ color: '#e94560', marginLeft: '20px', fontWeight: '500' }}>
                Welcome, {playerName || 'Player'}!
              </span>
              <Link to="/login" style={{ marginLeft: '10px' }}>
                Login
              </Link>
            </>
          ) : (
            <Link to="/login" style={{ marginLeft: '20px' }}>
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;