import { useState } from 'react';
import { Link } from 'react-router-dom';
import { tournaments } from '../mockData';

// List of available games
const availableGames = [
  { id: 1, name: 'Valorant' },
  { id: 2, name: 'CS:GO' },
  { id: 3, name: 'Dota 2' },
  { id: 4, name: 'League of Legends' },
];

function Teams() {
  // State for team creation form
  const [teamName, setTeamName] = useState('');
  const [teamDescription, setTeamDescription] = useState('');
  const [selectedTournament, setSelectedTournament] = useState('');
  const [personName, setPersonName] = useState('');
  const [personEmail, setPersonEmail] = useState('');
  const [gamingId, setGamingId] = useState('');
  const [teamImage, setTeamImage] = useState(null);
  const [teamImageFile, setTeamImageFile] = useState(null);
  const [gamePreference, setGamePreference] = useState('');

  // Mock data for existing teams
  const [teams, setTeams] = useState([
    { id: 1, name: 'Alpha Squad', description: 'A fierce Valorant team', members: 3, tournamentId: 1, image: '/src/assets/team1.jpg', creator: { name: 'Alex', email: 'alex@example.com', gamingId: 'Alex#123' }, gamePreference: 'Valorant' },
    { id: 2, name: 'Beta Force', description: 'CS:GO pros', members: 4, tournamentId: 2, image: '/src/assets/team2.jpg', creator: { name: 'Beta', email: 'beta@example.com', gamingId: 'Beta#456' }, gamePreference: 'CS:GO' },
  ]);

  // Mock logged-in user
  const [currentUserTeam, setCurrentUserTeam] = useState(null);

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setTeamImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setTeamImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle team creation
  const handleCreateTeam = (e) => {
    e.preventDefault();
    if (!teamName.trim() || !personName.trim() || !personEmail.trim() || !gamingId.trim() || !gamePreference) {
      alert('Please fill in all required fields, including game preference!');
      return;
    }
    if (!teamImageFile) {
      alert('Please upload a team image!');
      return;
    }

    const newTeam = {
      id: teams.length + 1,
      name: teamName,
      description: teamDescription,
      members: 1,
      tournamentId: selectedTournament ? parseInt(selectedTournament) : null,
      image: teamImage,
      creator: {
        name: personName,
        email: personEmail,
        gamingId: gamingId,
      },
      gamePreference,
    };

    setTeams([...teams, newTeam]);
    setCurrentUserTeam(newTeam.id);
    // Reset form
    setTeamName('');
    setTeamDescription('');
    setSelectedTournament('');
    setPersonName('');
    setPersonEmail('');
    setGamingId('');
    setTeamImage(null);
    setTeamImageFile(null);
    setGamePreference('');
    alert(`Team "${newTeam.name}" created successfully!`);
  };

  // Handle joining a team
  const handleJoinTeam = (teamId) => {
    if (currentUserTeam) {
      alert('You are already in a team! Leave your current team first.');
      return;
    }
    setCurrentUserTeam(teamId);
    setTeams(teams.map((team) =>
      team.id === teamId ? { ...team, members: team.members + 1 } : team
    ));
    alert('Joined team successfully!');
  };

  // Handle leaving a team
  const handleLeaveTeam = () => {
    if (!currentUserTeam) return;
    setTeams(teams.map((team) =>
      team.id === currentUserTeam ? { ...team, members: team.members - 1 } : team
    ));
    setCurrentUserTeam(null);
    alert('Left team successfully!');
  };

  return (
    <div
      style={{
        background: 'url("../assets/teams-bg.jpg") no-repeat center center fixed',
        backgroundSize: 'cover',
        minHeight: '100vh',
      }}
    >
      <div className="container">
        <h1>Team Management</h1>
        <p style={{ fontSize: '18px', marginBottom: '30px' }}>
          Create or manage your team for upcoming tournaments.
        </p>

        {/* Create Team Section */}
        <section style={{ marginBottom: '50px', background: '#16213e', padding: '20px', borderRadius: '10px' }}>
          <h2>Create a New Team</h2>
          <form onSubmit={handleCreateTeam} className="login-form">
            <input
              type="text"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              placeholder="Team Name *"
              style={{ marginBottom: '15px' }}
            />
            <input
              type="text"
              value={teamDescription}
              onChange={(e) => setTeamDescription(e.target.value)}
              placeholder="Team Description (Optional)"
              style={{ marginBottom: '15px' }}
            />
            <select
              value={selectedTournament}
              onChange={(e) => setSelectedTournament(e.target.value)}
              style={{ width: '100%', padding: '12px', marginBottom: '15px', borderRadius: '5px', background: '#0f3460', color: '#e0e0e0' }}
            >
              <option value="">Select a Tournament (Optional)</option>
              {tournaments.map((tournament) => (
                <option key={tournament.id} value={tournament.id}>
                  {tournament.name} - {tournament.game}
                </option>
              ))}
            </select>
            <input
              type="text"
              value={personName}
              onChange={(e) => setPersonName(e.target.value)}
              placeholder="Your Name *"
              style={{ marginBottom: '15px' }}
            />
            <input
              type="email"
              value={personEmail}
              onChange={(e) => setPersonEmail(e.target.value)}
              placeholder="Your Email *"
              style={{ marginBottom: '15px' }}
            />
            <input
              type="text"
              value={gamingId}
              onChange={(e) => setGamingId(e.target.value)}
              placeholder="Gaming ID (e.g., Player#123) *"
              style={{ marginBottom: '15px' }}
            />
            <select
              value={gamePreference}
              onChange={(e) => setGamePreference(e.target.value)}
              style={{ width: '100%', padding: '12px', marginBottom: '15px', borderRadius: '5px', background: '#0f3460', color: '#e0e0e0' }}
            >
              <option value="">Select Game Preference *</option>
              {availableGames.map((game) => (
                <option key={game.id} value={game.name}>
                  {game.name}
                </option>
              ))}
            </select>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>Upload Team Image *</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ background: '#0f3460', padding: '5px', borderRadius: '5px' }}
              />
              {teamImage && (
                <img
                  src={teamImage}
                  alt="Team Preview"
                  style={{ width: '100px', height: '100px', marginTop: '10px', borderRadius: '5px', objectFit: 'cover' }}
                />
              )}
            </div>
            <button type="submit">Create Team</button>
          </form>
        </section>

        {/* Current Team Section */}
        <section style={{ marginBottom: '50px' }}>
          <h2>Your Team</h2>
          {currentUserTeam ? (
            <div className="tournament-card">
              <img src={teams.find((t) => t.id === currentUserTeam)?.image} alt="Team" />
              <div className="content">
                <h3>{teams.find((t) => t.id === currentUserTeam)?.name}</h3>
                <p>Description: {teams.find((t) => t.id === currentUserTeam)?.description || 'No description'}</p>
                <p>Game Preference: {teams.find((t) => t.id === currentUserTeam)?.gamePreference}</p>
                <p>Members: {teams.find((t) => t.id === currentUserTeam)?.members}</p>
                <p>Created by: {teams.find((t) => t.id === currentUserTeam)?.creator.name}</p>
                <p>Email: {teams.find((t) => t.id === currentUserTeam)?.creator.email}</p>
                <p>Gaming ID: {teams.find((t) => t.id === currentUserTeam)?.creator.gamingId}</p>
                {teams.find((t) => t.id === currentUserTeam)?.tournamentId && (
                  <p>
                    Tournament:{' '}
                    <Link to={`/tournaments/${teams.find((t) => t.id === currentUserTeam)?.tournamentId}`}>
                      {tournaments.find((t) => t.id === teams.find((t) => t.id === currentUserTeam)?.tournamentId)?.name}
                    </Link>
                  </p>
                )}
                <button onClick={handleLeaveTeam} style={{ background: '#ff4444', marginTop: '10px' }}>
                  Leave Team
                </button>
              </div>
            </div>
          ) : (
            <p style={{ color: '#aaa' }}>You are not in a team yet. Create one or join below!</p>
          )}
        </section>

        {/* Available Teams Section */}
        <section>
          <h2>Available Teams</h2>
          {teams.length === 0 ? (
            <p style={{ color: '#aaa' }}>No teams available yet.</p>
          ) : (
            <div className="grid">
              {teams
                .filter((team) => team.id !== currentUserTeam)
                .map((team) => (
                  <div key={team.id} className="tournament-card">
                    <img src={team.image} alt={team.name} />
                    <div className="content">
                      <h3>{team.name}</h3>
                      <p>Description: {team.description || 'No description'}</p>
                      <p>Game Preference: {team.gamePreference}</p>
                      <p>Members: {team.members}</p>
                      <p>Created by: {team.creator.name}</p>
                      {team.tournamentId && (
                        <p>
                          Tournament:{' '}
                          <Link to={`/tournaments/${team.tournamentId}`}>
                            {tournaments.find((t) => t.id === team.tournamentId)?.name}
                          </Link>
                        </p>
                      )}
                      <button onClick={() => handleJoinTeam(team.id)}>Join Team</button>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default Teams;