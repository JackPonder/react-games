import "../styles/InfoBox.css";

export default function InfoBox() {
  const otherGames = [
    {name: "Connect 4", link: "connect-four"}, 
    {name: "Checkers", link: "checkers"},
  ]

  return (
    <div className="info-box hidden">
      <h2>Other Games</h2>
      {otherGames.map(game => 
        <a href={`/${game.link}`} className="btn btn-large">
          {game.name}
        </a>
      )}
    </div>
  )
}