import { useState, DragEventHandler } from "react";

import "../styles/Board.css";

export default function Checkers() {
  const [currentPiece, setCurrentPiece] = useState(-1);
  const [turn, setTurn] = useState(1 as 1 | 2);
  const [winner, setWinner] = useState(0 as 0 | 1 | 2);
  const [board, setBoard] = useState([
    0, 2, 0, 2, 0, 2, 0, 2,
    2, 0, 2, 0, 2, 0, 2, 0,
    0, 2, 0, 2, 0, 2, 0, 2,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    1, 0, 1, 0, 1, 0, 1, 0,
    0, 1, 0, 1, 0, 1, 0, 1,
    1, 0, 1, 0, 1, 0, 1, 0,
  ]);

  const resetGame = () => {
    if (!winner) {return}
    setTurn(1);
    setWinner(0);
    setCurrentPiece(-1);
    setBoard([
      0, 2, 0, 2, 0, 2, 0, 2,
      2, 0, 2, 0, 2, 0, 2, 0,
      0, 2, 0, 2, 0, 2, 0, 2,
      0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0,
      1, 0, 1, 0, 1, 0, 1, 0,
      0, 1, 0, 1, 0, 1, 0, 1,
      1, 0, 1, 0, 1, 0, 1, 0,
    ]);
  }

  const checkWinner = () => {
    if (!board.includes(1) && board.includes(2)) {
      return 2;
    } else if (!board.includes(2) && board.includes(1)) {
      return 1;
    }
    return 0;
  }

  const findMid = (num1: number, num2: number) => {
    return num1 - ((num1 - num2) / 2);
  }

  const allowDrop: DragEventHandler = (event) => {
    event.preventDefault();
  }

  const drop: DragEventHandler = (event) => {
    event.preventDefault();
    const targetSpace = parseInt(event.currentTarget.id);
    if (turn !== board[currentPiece]) {return}
    if (board[targetSpace]) {return}

    const possibleMoves = turn === 1 ? [
      currentPiece - 7,
      currentPiece - 9,
    ] : [
      currentPiece + 7,
      currentPiece + 9,
    ];
    const possibleJumps = turn === 1 ? [
      currentPiece - 14,
      currentPiece - 18,
    ] : [
      currentPiece + 14,
      currentPiece + 18,
    ];

    if (possibleMoves.includes(targetSpace)) {
      setBoard(board.map((value, index) => 
        index === currentPiece ? 
        0 : index === targetSpace ?
        turn : value
      ));
    } else if (possibleJumps.includes(targetSpace) && 
      board[findMid(currentPiece, targetSpace)] === (turn === 1 ? 2 : 1)) {
      setBoard(board.map((value, index) => 
        index === currentPiece || index === findMid(currentPiece, targetSpace) ? 
        0 : index === targetSpace ?
        turn : value
      ));
    } else {
      return;
    }

    setWinner(checkWinner());
    setTurn(turn === 1 ? 2 : 1);
  }

  const drag: DragEventHandler = (event) => {
    event.preventDefault();
    setCurrentPiece(parseInt(event.currentTarget.parentElement!.id));
  }

  return (
    <div className="board-container">
      <div className="board-label">
        Checkers
      </div>
      <div className="checkerboard">
        {board.map((value, index) => 
          <div id={index.toString()} onDrop={drop} onDragOver={allowDrop}>
            {value ? 
              <div className={`piece player-${value}`} 
                onDrag={drag} draggable={turn === value ? true : false} >  
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