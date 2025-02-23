import { Link } from 'react-router-dom';

function TournamentCard({ tournament }) {
  return (
    <div className="tournament-card">
      <img src={tournament.image} alt={tournament.name} />
      <div className="content">
        <h2>{tournament.name}</h2>
        <p>Game: {tournament.game}</p>
        <p>Prize Pool: ${tournament.prizePool.toLocaleString()}</p>
        <p>Starts: {tournament.startDate}</p>
        <Link to={`/tournaments/${tournament.id}`}>View Details</Link>
      </div>
    </div>
  );
}

export default TournamentCard;