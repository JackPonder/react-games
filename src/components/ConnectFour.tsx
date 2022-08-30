import { useState, MouseEventHandler } from "react";
import { TbCrown } from "react-icons/tb";

import "../styles/Board.css";
import "../styles/ConnectFour.css";

export default function ConnectFour() {
  const [board, setBoard] = useState(Array(42).fill(0) as number[]);
  const [turn, setTurn] = useState(1 as 1 | 2);
  const [winner, setWinner] = useState(0 as 0 | 1 | 2);

  const resetGame = () => {
    if (!winner) {return}
    setBoard(Array(42).fill(0));
    setTurn(1);
    setWinner(0);
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

  const handleMove: MouseEventHandler = (event) => {
    if (winner) {return}
    let target = parseInt(event.currentTarget.id);
    while (board[target + 7] === 0) {target += 7}
    if (board[target]) {return}
    board[target] = turn;

    checkWinner();
    setTurn(turn === 1 ? 2 : 1);
  }

  return (
    <div className="board-container">
      <div className="board-label">
        Connect 4
      </div>
      <div className="board">
        {board.map((value, index) => 
          <div id={index.toString()} onClick={handleMove}>
            {value ? 
              Number.isInteger(value) ? 
              <div className={`piece player-${value} drop-in`} /> : 
              <div className={`piece player-${Math.floor(value)} drop-in`}>
                <TbCrown size="50%" />
              </div> :
              null
            }
          </div>
        )}
      </div>
      <div className="board-label" onClick={resetGame}>
        {winner ?
          `Player ${winner} has won! Tap to reset game.` :
          `Player ${turn}'s turn`
        }
      </div>
    </div>
  );
}
