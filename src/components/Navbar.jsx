import { useState, useEffect } from 'react'; 
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png'; 

function Navbar() {
  const [role, setRole] = useState('player'); 
  const [isLoggedIn, setIsLoggedIn] = useState(true); 
  const [playerName, setPlayerName] = useState(''); 

  
  useEffect(() => {
    const savedDetails = localStorage.getItem('playerDetails');
    if (savedDetails) {
      const details = JSON.parse(savedDetails);
      setPlayerName(details.name);
    }
    if (!isLoggedIn) {
      setPlayerName(''); 
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