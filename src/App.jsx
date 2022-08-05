import { useState } from "react";
import "./App.css";

export default function App() {
  const [ turn, setTurn ] = useState(1);
  const [ gameOver, setGameOver ] = useState(false);

  const checkWinner = () => {
    const board = document.getElementById("board").children;
    const wins = [
      [0, 1, 2, 3],
      [0, 8, 16, 24],
      [0, 7, 14, 21],
      [0, 9, 18, 27],
    ];
    
    for (const element of board) {
      for (const win of wins) {
        const pieces = win.map(i => document.getElementById(parseInt(element.id) + i)?.children[0]);
        if (pieces.every(piece => piece?.className === pieces[0]?.className && piece)) {
          setGameOver(true);
          return;
        }
      }
    }
  }

  const handleMove = (event) => {
    if (gameOver) return;
    let targetSpace = event.target;
    while (document.getElementById(parseInt(targetSpace.id) + 8)?.children.length === 0) {
      targetSpace = document.getElementById(parseInt(targetSpace.id) + 8);
    }
    
    if (targetSpace.className !== "grid-space" || targetSpace.children.length !== 0) return;
    const piece = document.createElement("div");
    piece.className = `piece player-${turn}`;
    targetSpace.appendChild(piece);
    turn === 1 ? setTurn(2) : setTurn(1);
    checkWinner();
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
