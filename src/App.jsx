import { useState } from "react";
import "./App.css";

export default function App() {
  const [ turn, setTurn ] = useState(1);

  const handleMove = (event) => {
    let targetSpace = event.target;
    while (parseInt(targetSpace.id) < 40 && document.getElementById(parseInt(targetSpace.id) + 8).className === "grid-space") {
      targetSpace = document.getElementById(parseInt(targetSpace.id) + 8);
    }
    
    if (targetSpace.className !== "grid-space") return;
    targetSpace.className = `grid-space player-${turn}`;
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
