import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Tournament from './pages/Tournament';
import Teams from './pages/Team';
import Leaderboard from './pages/Leaderboard';
import PlayerProfile from './pages/PlayerProfile';

function App() {
  const location = useLocation();
  const [animationKey, setAnimationKey] = useState(location.pathname);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAnimationKey(location.pathname);
    }, 100);

    return () => clearTimeout(timeout);
  }, [location.pathname]);

  return (
    <div>
      <Navbar />
      <div className="page-content">
        <Routes location={location} key={animationKey}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tournament" element={<Tournament />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/player-profile" element={<PlayerProfile />} /> {/* New route */}
        </Routes>
      </div>
    </div>
  );
}

export default App;