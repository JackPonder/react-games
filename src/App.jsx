import { useState } from "react";
import "./App.css";

export default function App() {
  const [ turn, setTurn ] = useState(1);

  const handleMove = (event) => {
    let targetSpace = event.target;
    while (document.getElementById(parseInt(targetSpace.id) + 8)?.children.length === 0) {
      targetSpace = document.getElementById(parseInt(targetSpace.id) + 8);
    }
    
    if (targetSpace.className !== "grid-space" || targetSpace.children.length !== 0) return;
    const piece = document.createElement("div");
    piece.className = `piece player-${turn}`;
    targetSpace.appendChild(piece);
    turn === 1 ? setTurn(2) : setTurn(1);
  }

  return (
    <div className="App">
      <div className="board" id="board">
        {Array(48).fill().map((_, i) => 
          <div className="grid-space" id={i} onClick={handleMove} />
        )}
      </div>   
    </div>
  );
}
