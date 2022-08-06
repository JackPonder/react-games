import { useState } from "react";
import "./App.css";

export default function App() {
  const [ board, setBoard ] = useState(Array(42).fill(0));
  const [ turn, setTurn ] = useState(1);
  const [ winner, setWinner ] = useState(0);

  const resetBoard = () => {
    if (!winner) return;
    setBoard(Array(42).fill(0));
    setTurn(1);
    setWinner(0);
  }

  const checkWinner = () => {
    const wins = [
      [0, 1, 2, 3],
      [0, 6, 12, 18],
      [0, 7, 14, 21],
      [0, 8, 16, 24],
    ];
    
    for (let i = 0; i < board.length; i++) {
      for (const win of wins) {
        const pieces = win.map(j => board[i + j]);
        if (pieces.every(piece => piece === pieces[0] && piece)) {
          win.map(j => board[i + j] += 0.5);
          setWinner(turn);
        }
      }
    }
  }

  const handleMove = (event) => {
    if (winner) return;
    let target = parseInt(event.target.id);
    while (board[target + 7] === 0) target += 7;
    board[target] = turn;
    turn === 1 ? setTurn(2) : setTurn(1);
    checkWinner();
  }

  return (
    <>
      <div className="header" onClick={resetBoard}>
        {winner ? `Player ${winner} has won! Tap to reset game.` : `Player ${turn}'s Turn`}
      </div>
      <div className="container">
        <div className="board" id="board">
          {board.map((value, index) => 
            <div className="grid-space" id={index} value={0} onClick={handleMove}>
              {value ? 
                Number.isInteger(value) ? 
                <div className={`piece player-${value}`} /> : 
                <div className={`piece player-${Math.floor(value)} winner`} /> :
                null
              }
            </div>
          )}
        </div>   
      </div>
    </>
  );
}
