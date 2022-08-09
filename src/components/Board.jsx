import { updateDoc } from "firebase/firestore";
import { TbCrown } from "react-icons/tb";

export default function Board({ docRef, user, gameVariables }) {
  const board = gameVariables.board;
  const players = gameVariables.players;
  const turn = gameVariables.turn;
  const winner = gameVariables.winner;

  const resetBoard = () => {
    if (!winner) return;
    updateDoc(docRef, { 
      board: Array(42).fill(0), 
      turn: 1, 
      winner: 0 
    });
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
      while (col > 6) col -= 7;

      if (col < 4) {
        for (const win of wins) {
          const pieces = win.map(j => board[i + j]);
          if (pieces.every(piece => piece === pieces[0] && piece)) {
            win.map(j => board[i + j] += 0.5);
            return turn;
          }
        }
      } else {
        const pieces = wins[0].map(j => board[i + j]);
        if (pieces.every(piece => piece === pieces[0] && piece)) {
          wins[0].map(j => board[i + j] += 0.5);
          return turn;
        }
      }
    }
    return 0;
  }

  const handleMove = (event) => {
    if (winner) return;
    if (event.target.className !== "grid-space") return;
    if (players[turn - 1] !== user?.displayName) return;

    let target = parseInt(event.target.id);
    while (board[target + 7] === 0) target += 7;
    board[target] = turn;

    updateDoc(docRef, { 
      board, winner: checkWinner(), turn: turn === 1 ? 2 : 1,
    });
  }

  return (
    <div className="board-container">
      <div className="board-label">
        {players[0]} vs. {players[1]}
      </div>
      <div className="board" id="board">
        {board.map((value, index) => 
          <div className="grid-space" id={index} onClick={handleMove}>
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
          `${players[turn - 1]}'s turn`
        }
      </div>
    </div>
  );
}
