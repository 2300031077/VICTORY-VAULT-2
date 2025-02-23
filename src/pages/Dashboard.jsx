import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Mock player data and tournaments/teams
let playerTournaments = []; // Mock global state (from Tournament.jsx)

function Dashboard() {
  const role = 'player'; // Mock role
  const playerName = 'PlayerName'; // Mock player name (replace with auth later)
  const [playerTeams, setPlayerTeams] = useState([]);

  // Mock player teams
  useEffect(() => {
    const mockTeams = [
      { id: 1, name: 'Alpha Squad', gamePreference: 'Valorant', members: 3 },
      { id: 2, name: 'Beta Force', gamePreference: 'CS:GO', members: 4 },
    ];
    setPlayerTeams(mockTeams);
  }, []);

  // Filter tournaments the player has joined
  const joinedTournaments = playerTournaments.filter(
    (registration) => registration.player.name === playerName
  );

  return (
    <div
      style={{
        background: 'url("../assets/dashboard-bg.jpg") no-repeat center center fixed',
        backgroundSize: 'contain',
        backgroundColor: '#1a1a2e', /* Fallback color for uncovered areas */
        minHeight: '100vh',
      }}
    >
      <div className="container">
        <h1>Player Dashboard</h1>
        {role === 'player' && (
          <>
            <div style={{ marginBottom: '30px', background: '#16213e', padding: '20px', borderRadius: '10px' }}>
              <h2>Welcome, {playerName}!</h2>
              <p style={{ marginBottom: '15px' }}>Manage your tournaments, teams, and profile here.</p>
              <div style={{ display: 'flex', gap: '20px' }}>
                <Link to="/teams">
                  <button style={{ background: '#e94560', padding: '10px 20px', border: 'none', borderRadius: '5px', color: 'white' }}>
                    Manage Teams
                  </button>
                </Link>
                <Link to="/tournaments">
                  <button style={{ background: '#e94560', padding: '10px 20px', border: 'none', borderRadius: '5px', color: 'white' }}>
                    Explore Tournaments
                  </button>
                </Link>
                <Link to="/player-profile">
                  <button style={{ background: '#e94560', padding: '10px 20px', border: 'none', borderRadius: '5px', color: 'white' }}>
                    View Profile
                  </button>
                </Link>
              </div>
            </div>

            {/* Player Profile */}
            <section style={{ marginBottom: '30px', background: '#16213e', padding: '20px', borderRadius: '10px' }}>
              <h2>Your Profile</h2>
              <p><strong>Name:</strong> {playerName}</p>
              <p><strong>Gaming ID:</strong> {playerName}#123 (Mock)</p>
              <p><strong>Email:</strong> {playerName.toLowerCase()}@example.com (Mock)</p>
            </section>

            {/* Your Teams */}
            <section style={{ marginBottom: '30px', background: '#16213e', padding: '20px', borderRadius: '10px' }}>
              <h2>Your Teams</h2>
              {playerTeams.length > 0 ? (
                <div className="grid">
                  {playerTeams.map((team) => (
                    <div key={team.id} style={{ background: '#0f3460', padding: '15px', borderRadius: '5px', marginBottom: '15px' }}>
                      <p><strong>Team:</strong> {team.name}</p>
                      <p><strong>Game:</strong> {team.gamePreference}</p>
                      <p><strong>Members:</strong> {team.members}</p>
                      <Link to={`/teams`}>
                        <button style={{ background: '#e94560', padding: '8px 16px', border: 'none', borderRadius: '5px', color: 'white', marginTop: '10px' }}>
                          Manage Team
                        </button>
                      </Link>
                    </div>
                  ))}
                </div>
              ) : (
                <p>You haven’t created or joined any teams yet. <Link to="/teams">Create a team now</Link>!</p>
              )}
            </section>

            {/* Your Tournaments */}
            <section style={{ marginBottom: '30px', background: '#16213e', padding: '20px', borderRadius: '10px' }}>
              <h2>Your Tournaments</h2>
              {joinedTournaments.length > 0 ? (
                joinedTournaments.map((tournament, index) => (
                  <div key={index} style={{ marginBottom: '15px', padding: '10px', background: '#0f3460', borderRadius: '5px' }}>
                    <p><strong>Tournament:</strong> {tournament.tournamentName}</p>
                    <p><strong>Game:</strong> {tournament.game}</p>
                    <p><strong>Start Date:</strong> {tournament.startDate}</p>
                    <p><strong>Your Details:</strong> {tournament.player.name} ({tournament.player.gamingId})</p>
                    {tournament.player.teamName && <p><strong>Team:</strong> {tournament.player.teamName}</p>}
                    <Link to={`/tournaments/${tournament.tournamentId}`}>
                      <button style={{ background: '#e94560', padding: '8px 16px', border: 'none', borderRadius: '5px', color: 'white', marginTop: '10px' }}>
                        View Tournament
                      </button>
                    </Link>
                  </div>
                ))
              ) : (
                <p>You haven’t joined any tournaments yet. <Link to="/tournaments">Join a tournament now</Link>!</p>
              )}
            </section>
          </>
        )}
        {role === 'organizer' && (
          <div style={{ marginBottom: '30px', background: '#16213e', padding: '20px', borderRadius: '10px' }}>
            <h2>Organizer Dashboard</h2>
            <p>Manage your tournaments, schedules, and prize distributions here.</p>
            <Link to="/dashboard">
              <button style={{ background: '#e94560', padding: '10px 20px', border: 'none', borderRadius: '5px', color: 'white' }}>
                Manage Tournaments
              </button>
            </Link>
          </div>
        )}
        {role === 'admin' && (
          <div style={{ marginBottom: '30px', background: '#16213e', padding: '20px', borderRadius: '10px' }}>
            <h2>Admin Dashboard</h2>
            <p>Oversee all users, tournaments, and system activities here.</p>
            <Link to="/dashboard">
              <button style={{ background: '#e94560', padding: '10px 20px', border: 'none', borderRadius: '5px', color: 'white' }}>
                Manage System
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;