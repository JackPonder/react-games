import { useState } from "react";
import { TbCrown } from "react-icons/tb";

import "../styles/Board.css";

export default function Board() {
  const [board, setBoard] = useState(Array(42).fill(0) as number[]);
  const [turn, setTurn] = useState(1);
  const [winner, setWinner] = useState(0);

  const resetBoard = () => {
    if (!winner) {return}
    setBoard(Array(42).fill(0));
  }

  const checkWinner = () => {
    const wins = [
      [0, 7, 14, 21],
      [0, 1, 2, 3],
      [0, 8, 16, 24],
      [0, -6, -12, -18],
    ];
    
    for (let i = 0; i < board.length; i++) {
      let col = i;
      while (col > 6) {col -= 7}

      if (col < 4) {
        for (const win of wins) {
          const pieces = win.map(j => board[i + j]);
          if (pieces.every(piece => piece === pieces[0] && piece)) {
            win.map(j => board[i + j] += 0.5);
            setWinner(turn);
          }
        }
      } else {
        const pieces = wins[0].map(j => board[i + j]);
        if (pieces.every(piece => piece === pieces[0] && piece)) {
          wins[0].map(j => board[i + j] += 0.5);
          setWinner(turn);
        }
      }
    }
  }

  const handleMove = (event: any) => {
    if (winner) {return}
    if (event.target.className !== "grid-space") {return}

    let target = parseInt(event.target.id);
    while (board[target + 7] === 0) {target += 7}
    board[target] = turn;

    checkWinner();
    setTurn(turn === 1 ? 2 : 1);
  }

  return (
    <div className="board-container">
      <div className="board-label">
        Connect 4
      </div>
      <div className="board" id="board">
        {board.map((value, index) => 
          <div className="grid-space" id={index.toString()} onClick={handleMove}>
            {value ? 
              Number.isInteger(value) ? 
              <div className={`piece player-${value}`} /> : 
              <div className={`piece player-${Math.floor(value)}`}>
                <TbCrown size="50%" />
              </div> :
              null
            }
          </div>
        )}
      </div>
      <div className="board-label" onClick={resetBoard}>
        {winner ?
          `Player ${winner} has won! Tap to reset game.` :
          `Player ${turn}'s turn`
        }
      </div>
    </div>
  );
}
