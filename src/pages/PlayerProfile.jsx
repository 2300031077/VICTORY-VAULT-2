import { Link } from 'react-router-dom';

// Mock player data and tournaments/teams (replace with real data or state management)
const playerName = 'PlayerName'; // Mock player name (replace with auth later)
let playerTournaments = []; // Mock global state (from Tournament.jsx)
let playerTeams = []; // Mock global state (from Dashboard.jsx)

// Mock additional player details
const playerDetails = {
  email: `${playerName.toLowerCase()}@example.com`,
  gamingId: `${playerName}#123`,
  joinedDate: '2025-01-15', // Mock join date
  totalPoints: 5000, // Mock total points
};

function PlayerProfile() {
  // Simulate fetching player teams and tournaments
  const joinedTournaments = playerTournaments.filter(
    (registration) => registration.player.name === playerName
  );

  return (
    <div
      style={{
        background: 'url("../assets/profile-bg.jpg") no-repeat center center fixed',
        backgroundSize: 'contain',
        backgroundColor: '#1a1a2e', /* Fallback color for uncovered areas */
        minHeight: '100vh',
      }}
    >
      <div className="container">
        <h1>Player Profile</h1>
        <div style={{ marginBottom: '30px', background: '#16213e', padding: '20px', borderRadius: '10px' }}>
          <h2>{playerName}</h2>
          <p><strong>Gaming ID:</strong> {playerDetails.gamingId}</p>
          <p><strong>Email:</strong> {playerDetails.email}</p>
          <p><strong>Joined:</strong> {playerDetails.joinedDate}</p>
          <p><strong>Total Points:</strong> {playerDetails.totalPoints}</p>
          <Link to="/dashboard">
            <button style={{ marginTop: '15px', background: '#e94560', padding: '10px 20px', border: 'none', borderRadius: '5px', color: 'white' }}>
              Back to Dashboard
            </button>
          </Link>
        </div>

        {/* Player Teams */}
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

        {/* Player Tournaments */}
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
      </div>
    </div>
  );
}

export default PlayerProfile;