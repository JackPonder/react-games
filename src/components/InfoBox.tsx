import "../styles/InfoBox.css";

export default function InfoBox() {
  const otherGames = ["Connect 4", "Checkers"]

  return (
    <div className="info-box hidden">
      <h2>Other Games</h2>
      {otherGames.map(value => 
        <button className="btn btn-large">
          {value}
        </button>
      )}
    </div>
  )
}