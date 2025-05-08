import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


let playerTournaments = []; 
let playerTeams = []; 

function PlayerProfile() {

  const [isEditing, setIsEditing] = useState(false);
  const [playerDetails, setPlayerDetails] = useState(() => {
    const savedDetails = localStorage.getItem('playerDetails');
    return savedDetails ? JSON.parse(savedDetails) : {
      name: 'PlayerName',
      email: 'playername@example.com',
      gamingId: 'PlayerName#123',
      joinedDate: '2025-01-15', 
      totalPoints: 5000, 
    };
  });

  
  const [joinedTournaments, setJoinedTournaments] = useState([]);
  const [playerTeamsState, setPlayerTeamsState] = useState([]);

  useEffect(() => {
    
    const mockTeams = [
      { id: 1, name: 'Alpha Squad', gamePreference: 'Valorant', members: 3 },
      { id: 2, name: 'Beta Force', gamePreference: 'CS:GO', members: 4 },
    ];
    setPlayerTeamsState(mockTeams);

    
    const tournaments = playerTournaments.filter(
      (registration) => registration.player.name === playerDetails.name
    );
    setJoinedTournaments(tournaments);
  }, [playerDetails.name]);

  
  useEffect(() => {
    localStorage.setItem('playerDetails', JSON.stringify(playerDetails));
  }, [playerDetails]);

  
  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (!playerDetails.name.trim() || !playerDetails.email.trim() || !playerDetails.gamingId.trim()) {
      alert('Please fill in all required fields!');
      return;
    }
    setIsEditing(false); 
    alert(`Profile updated successfully for ${playerDetails.name}!`);
  };

  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPlayerDetails({ ...playerDetails, [name]: value });
  };

  return (
    <div
      style={{
        background: 'url("../assets/profile-bg.jpg") no-repeat center center fixed',
        backgroundSize: 'contain',
        backgroundColor: '#1a1a2e', 
        minHeight: '100vh',
      }}
    >
      <div className="container">
        <h1>Player Profile</h1>
        <div style={{ marginBottom: '30px', background: '#16213e', padding: '20px', borderRadius: '10px' }}>
          {isEditing ? (
            <form onSubmit={handleEditSubmit}>
              <input
                type="text"
                name="name"
                value={playerDetails.name}
                onChange={handleInputChange}
                placeholder="Full Name *"
                style={{ width: '100%', padding: '10px', marginBottom: '15px', borderRadius: '5px', border: '1px solid #0f3460', background: '#0f3460', color: '#e0e0e0' }}
              />
              <input
                type="email"
                name="email"
                value={playerDetails.email}
                onChange={handleInputChange}
                placeholder="Email *"
                style={{ width: '100%', padding: '10px', marginBottom: '15px', borderRadius: '5px', border: '1px solid #0f3460', background: '#0f3460', color: '#e0e0e0' }}
              />
              <input
                type="text"
                name="gamingId"
                value={playerDetails.gamingId}
                onChange={handleInputChange}
                placeholder="Gaming ID (e.g., Player#123) *"
                style={{ width: '100%', padding: '10px', marginBottom: '15px', borderRadius: '5px', border: '1px solid #0f3460', background: '#0f3460', color: '#e0e0e0' }}
              />
              <div style={{ display: 'flex', gap: '10px' }}>
                <button type="submit" style={{ background: '#e94560', padding: '10px 20px', border: 'none', borderRadius: '5px', color: 'white', cursor: 'pointer', flex: 1 }}>
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  style={{ background: '#ff4444', padding: '10px 20px', border: 'none', borderRadius: '5px', color: 'white', cursor: 'pointer', flex: 1 }}
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <>
              <h2>{playerDetails.name}</h2>
              <p><strong>Gaming ID:</strong> {playerDetails.gamingId}</p>
              <p><strong>Email:</strong> {playerDetails.email}</p>
              <p><strong>Joined:</strong> {playerDetails.joinedDate}</p>
              <p><strong>Total Points:</strong> {playerDetails.totalPoints}</p>
              <button
                onClick={() => setIsEditing(true)}
                style={{ marginTop: '15px', background: '#e94560', padding: '10px 20px', border: 'none', borderRadius: '5px', color: 'white' }}
              >
                Edit Profile
              </button>
              <Link to="/dashboard">
                <button style={{ marginTop: '15px', background: '#e94560', padding: '10px 20px', border: 'none', borderRadius: '5px', color: 'white', marginLeft: '10px' }}>
                  Back to Dashboard
                </button>
              </Link>
            </>
          )}
        </div>

        {/* Player Teams */}
        <section style={{ marginBottom: '30px', background: '#16213e', padding: '20px', borderRadius: '10px' }}>
          <h2>Your Teams</h2>
          {playerTeamsState.length > 0 ? (
            <div className="grid">
              {playerTeamsState.map((team) => (
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
            <p>You haven’t joined any tournaments yet. <Link to="/teams">Join a tournament now</Link>!</p>
          )}
        </section>
      </div>
    </div>
  );
}

export default PlayerProfile;