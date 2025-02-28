import TournamentCard from '../components/TournamentCard';
import { tournaments } from '../mockData';
import { useState, useEffect } from 'react'; 
function Home() {
 
  const bestPlayers = [
    { rank: 1, name: 'ShadowStriker', gamingId: 'Shadow#123', points: 2500, game: 'Valorant' },
    { rank: 2, name: 'BlazeMaster', gamingId: 'Blaze#456', points: 2200, game: 'CS:GO' },
    { rank: 3, name: 'FrostQueen', gamingId: 'Frost#789', points: 1900, game: 'Dota 2' },
    { rank: 4, name: 'ThunderHub', gamingId: 'Thunder#101', points: 1700, game: 'League of Legends' },
    { rank: 5, name: 'PixelNinja', gamingId: 'Pixel#202', points: 1500, game: 'Valorant' },
  ];

  
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
    <div
      style={{
        background: 'url("../assets/home-bg.jpg") no-repeat center center fixed',
        backgroundSize: 'contain',
        backgroundColor: '#1a1a2e', 
        minHeight: '100vh',
      }}
    >
      <div className="banner">
        <div>
          <h1>Welcome to Victory Vault</h1>
          <p>Explore epic tournaments, compete, and claim your glory!</p>
          <button style={{ marginTop: '20px', padding: '12px 24px', background: '#e94560', color: 'white', border: 'none', borderRadius: '5px' }}>
            Join Now
          </button>
        </div>
      </div>
      <div className="container">
        {/* Player Details Box (if logged in) */}
        

        <h1>Featured Tournaments</h1>
        <p style={{ marginBottom: '30px', fontSize: '18px' }}>
          Dive into the most exciting gaming competitions on our platform.
        </p>
        <div className="grid">
          {tournaments.map((tournament) => (
            <TournamentCard key={tournament.id} tournament={tournament} />
          ))}
        </div>
      </div>
      <div className="container" style={{ marginTop: '50px', marginBottom: '50px' }}>
        <h1>Top Players</h1>
        <p style={{ marginBottom: '20px', fontSize: '18px' }}>
          Meet the legends dominating the leaderboards!
        </p>
        <div style={{ background: '#16213e', padding: '20px', borderRadius: '10px', maxWidth: '800px', margin: '0 auto' }}>
          {bestPlayers.map((player) => (
            <div
              key={player.rank}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '15px 0',
                borderBottom: player.rank < 5 ? '1px solid #0f3460' : 'none',
              }}
            >
              <span style={{ color: '#e94560' }}><strong>#{player.rank}</strong> {player.name} ({player.gamingId})</span>
              <span>{player.points} Points - {player.game}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;