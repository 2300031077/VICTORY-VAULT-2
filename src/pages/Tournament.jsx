import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { tournaments } from '../mockData';

// Mock game descriptions
const gameDescriptions = {
  Valorant: 'Valorant is a tactical 5v5 character-based shooter by Riot Games. Teams compete in fast-paced matches, using unique agents with abilities to outsmart opponents. Key rules include no friendly fire, time-based rounds, and strategic bomb planting/defusal.',
  'CS:GO': 'Counter-Strike: Global Offensive (CS:GO) is a classic tactical first-person shooter. Two teams (Terrorists and Counter-Terrorists) battle in objective-based modes like bomb defusal and hostage rescue. Matches emphasize strategy, precision, and teamwork.',
  'Dota 2': 'Dota 2 is a multiplayer online battle arena (MOBA) game where two teams of five players control heroes to destroy the enemy’s Ancient. It features deep strategy, diverse hero abilities, and intense team coordination across three lanes.',
  'League of Legends': 'League of Legends (LoL) is a MOBA where two teams of five players control champions to destroy the enemy Nexus. Known for its strategic depth, role-based gameplay, and frequent updates, it’s a competitive staple in esports.',
};

// Mock function to simulate adding player to tournament
let playerTournaments = []; // Mock global state

function Tournament() {
  const { id } = useParams();
  const tournament = tournaments.find((t) => t.id === parseInt(id)) || {};
  const [showModal, setShowModal] = useState(false);
  const [playerDetails, setPlayerDetails] = useState({
    name: '',
    email: '',
    gamingId: '',
    teamName: '', // Optional field for team preference
  });

  // Mock login state and load player details from localStorage
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

    if (!tournament.game) {
      console.warn('No game found for this tournament.');
    }
  }, [isLoggedIn, tournament.game]);

  // Handle joining tournament and store details
  const handleJoinTournament = (e) => {
    e.preventDefault();
    if (!playerDetails.name.trim() || !playerDetails.email.trim() || !playerDetails.gamingId.trim()) {
      alert('Please fill in all required fields!');
      return;
    }
    const registration = {
      tournamentId: id,
      tournamentName: tournament.name,
      game: tournament.game,
      startDate: tournament.startDate,
      player: {
        name: playerDetails.name || playerName, // Use edited name if available, otherwise logged-in name
        email: playerDetails.email,
        gamingId: playerDetails.gamingId,
        teamName: playerDetails.teamName || 'No team',
      },
    };
    playerTournaments.push(registration); // Add to mock state
    console.log('Joined Tournament:', registration);
    alert(`Successfully registered for ${tournament.name}!`);
    setShowModal(false); // Close modal
    setPlayerDetails({ name: '', email: '', gamingId: '', teamName: '' }); // Reset form
  };

  return (
    <div
      style={{
        background: 'url("../assets/tournament-bg.jpg") no-repeat center center fixed',
        backgroundSize: 'contain',
        backgroundColor: '#1a1a2e', /* Fallback color for uncovered areas */
        minHeight: '100vh',
      }}
    >
      <div className="container">
        <h1>{tournament.name}</h1>
        <img src={tournament.image} alt={tournament.name} style={{ width: '100%', maxHeight: '300px', objectFit: 'cover', borderRadius: '10px' }} />
        
        {/* Game Information Section */}
        <section style={{ marginTop: '30px', background: '#16213e', padding: '20px', borderRadius: '10px' }}>
          <h2>About the Game: {tournament.game}</h2>
          <p style={{ marginBottom: '15px' }}>
            {gameDescriptions[tournament.game] || 'No description available for this game.'}
          </p>
          <p><strong>Prize Pool:</strong> ${tournament.prizePool?.toLocaleString()}</p>
          <p><strong>Start Date:</strong> {tournament.startDate}</p>
        </section>

        {/* Join Now Button (if not already joined) */}
        {isLoggedIn && !playerTournaments.some((t) => t.tournamentId === id && t.player.name === playerName) && (
          <button
            onClick={() => setShowModal(true)}
            style={{ marginTop: '30px', background: '#e94560', padding: '12px 24px', border: 'none', borderRadius: '5px', color: 'white', cursor: 'pointer' }}
          >
            Join Now
          </button>
        )}
        {isLoggedIn && playerTournaments.some((t) => t.tournamentId === id && t.player.name === playerName) && (
          <p style={{ marginTop: '30px', color: '#e94560' }}>
            You are already registered for this tournament as {playerName}!
          </p>
        )}

        {/* Modal for Player Registration */}
        {showModal && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.7)', /* Semi-transparent overlay */
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 20,
            }}
          >
            <div
              style={{
                background: '#16213e',
                padding: '30px',
                borderRadius: '10px',
                maxWidth: '400px',
                width: '90%',
                boxShadow: '0 6px 12px rgba(0, 0, 0, 0.3)',
              }}
            >
              <h2>Join {tournament.name}</h2>
              <form onSubmit={handleJoinTournament}>
                <input
                  type="text"
                  value={playerDetails.name}
                  onChange={(e) => setPlayerDetails({ ...playerDetails, name: e.target.value })}
                  placeholder="Full Name *"
                  style={{ width: '100%', padding: '10px', marginBottom: '15px', borderRadius: '5px', border: '1px solid #0f3460', background: '#0f3460', color: '#e0e0e0' }}
                />
                <input
                  type="email"
                  value={playerDetails.email}
                  onChange={(e) => setPlayerDetails({ ...playerDetails, email: e.target.value })}
                  placeholder="Email *"
                  style={{ width: '100%', padding: '10px', marginBottom: '15px', borderRadius: '5px', border: '1px solid #0f3460', background: '#0f3460', color: '#e0e0e0' }}
                />
                <input
                  type="text"
                  value={playerDetails.gamingId}
                  onChange={(e) => setPlayerDetails({ ...playerDetails, gamingId: e.target.value })}
                  placeholder="Gaming ID (e.g., Player#123) *"
                  style={{ width: '100%', padding: '10px', marginBottom: '15px', borderRadius: '5px', border: '1px solid #0f3460', background: '#0f3460', color: '#e0e0e0' }}
                />
                <input
                  type="text"
                  value={playerDetails.teamName}
                  onChange={(e) => setPlayerDetails({ ...playerDetails, teamName: e.target.value })}
                  placeholder="Team Name (Optional)"
                  style={{ width: '100%', padding: '10px', marginBottom: '15px', borderRadius: '5px', border: '1px solid #0f3460', background: '#0f3460', color: '#e0e0e0' }}
                />
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button type="submit" style={{ background: '#e94560', padding: '10px 20px', border: 'none', borderRadius: '5px', color: 'white', cursor: 'pointer', flex: 1 }}>
                    Join Tournament
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    style={{ background: '#ff4444', padding: '10px 20px', border: 'none', borderRadius: '5px', color: 'white', cursor: 'pointer', flex: 1 }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Tournament;