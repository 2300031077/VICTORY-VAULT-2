import { Link } from 'react-router-dom';


let playerTournaments = []; 
let playerTeams = []; 
const tournaments = [
  {
    id: 1,
    name: 'Winter Clash 2025',
    game: 'Valorant',
    prizePool: 5000,
    startDate: '2025-03-01',
    image: '/src/assets/game1.jpg',
  },
  {
    id: 2,
    name: 'Summer Showdown',
    game: 'CS:GO',
    prizePool: 10000,
    startDate: '2025-06-15',
    image: '/src/assets/game2.jpg',
  },
];


const mockTeams = [
  { id: 1, name: 'Alpha Squad', gamePreference: 'Valorant', members: 3 },
  { id: 2, name: 'Beta Force', gamePreference: 'CS:GO', members: 4 },
  { id: 3, name: 'Gamma Crew', gamePreference: 'Valorant', members: 2 },
  { id: 4, name: 'Delta Team', gamePreference: 'CS:GO', members: 5 },
];


const mockPlayerRegistrations = [
  { tournamentId: 1, teamId: 1, player: { name: 'ShadowStriker', gamingId: 'Shadow#123' } },
  { tournamentId: 1, teamId: 3, player: { name: 'FrostQueen', gamingId: 'Frost#789' } },
  { tournamentId: 2, teamId: 2, player: { name: 'BlazeMaster', gamingId: 'Blaze#456' } },
  { tournamentId: 2, teamId: 4, player: { name: 'ThunderHub', gamingId: 'Thunder#101' } },
];

function Leaderboard() {
  
  const games = {};
  tournaments.forEach((tournament) => {
    games[tournament.game] = {
      tournamentName: tournament.name,
      teams: mockTeams.filter((team) => team.gamePreference === tournament.game),
      players: mockPlayerRegistrations
        .filter((registration) => registration.tournamentId === tournament.id)
        .map((registration) => registration.player),
    };
  });

  return (
    <div
      style={{
        background: 'url("../assets/leaderboard-bg.jpg") no-repeat center center fixed',
        backgroundSize: 'contain',
        backgroundColor: '#1a1a2e', 
        minHeight: '100vh',
      }}
    >
      <div className="container">
        <h1>Leaderboard</h1>
        <p style={{ marginBottom: '20px', fontSize: '18px' }}>
          Check out the top teams and players across all games!
        </p>
        {Object.entries(games).map(([game, data]) => (
          <section key={game} style={{ marginBottom: '40px', background: '#16213e', padding: '20px', borderRadius: '10px' }}>
            <h2>{game} - {data.tournamentName}</h2>
            
            {/* Teams Section */}
            <div style={{ marginTop: '15px' }}>
              <h3>Teams</h3>
              {data.teams.length > 0 ? (
                <div className="grid">
                  {data.teams.map((team) => (
                    <div key={team.id} style={{ background: '#0f3460', padding: '15px', borderRadius: '5px', marginBottom: '15px' }}>
                      <p><strong>Team:</strong> {team.name}</p>
                      <p><strong>Members:</strong> {team.members}</p>
                      <Link to={`/teams`}>
                        <button style={{ background: '#e94560', padding: '8px 16px', border: 'none', borderRadius: '5px', color: 'white', marginTop: '10px' }}>
                          View Team
                        </button>
                      </Link>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No teams registered for this game yet.</p>
              )}
            </div>

            {/* Players Section */}
            <div style={{ marginTop: '20px' }}>
              <h3>Players</h3>
              {data.players.length > 0 ? (
                <div style={{ background: '#0f3460', padding: '15px', borderRadius: '5px' }}>
                  {data.players.map((player, index) => (
                    <p key={index} style={{ marginBottom: '10px' }}>
                      <strong>{index + 1}. {player.name}</strong> ({player.gamingId})
                    </p>
                  ))}
                </div>
              ) : (
                <p>No players registered for this game yet.</p>
              )}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

export default Leaderboard;