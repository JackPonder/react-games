import { useState, DragEventHandler } from "react";
import { TbCrown } from "react-icons/tb";

import "../styles/Board.css";

export default function Checkers() {
  const [turn, setTurn] = useState(1 as 1 | 2);
  const [winner, setWinner] = useState(0 as 0 | 1 | 2);
  const [doubleJump, setDoubleJump] = useState([] as number[]);
  const [board, setBoard] = useState([
    -1, 2, -1, 2, -1, 2, -1, 2,
    2, -1, 2, -1, 2, -1, 2, -1,
    -1, 2, -1, 2, -1, 2, -1, 2,
    0, -1, 0, -1, 0, -1, 0, -1,
    -1, 0, -1, 0, -1, 0, -1, 0,
    1, -1, 1, -1, 1, -1, 1, -1,
    -1, 1, -1, 1, -1, 1, -1, 1,
    1, -1, 1, -1, 1, -1, 1, -1,
  ]);

  let currentPiece = -1;

  const resetGame = () => {
    if (!winner) {return}
    setTurn(1);
    setWinner(0);
    setBoard([
      -1, 2, -1, 2, -1, 2, -1, 2,
      2, -1, 2, -1, 2, -1, 2, -1,
      -1, 2, -1, 2, -1, 2, -1, 2,
      0, -1, 0, -1, 0, -1, 0, -1,
      -1, 0, -1, 0, -1, 0, -1, 0,
      1, -1, 1, -1, 1, -1, 1, -1,
      -1, 1, -1, 1, -1, 1, -1, 1,
      1, -1, 1, -1, 1, -1, 1, -1,
    ]);
    currentPiece = -1;
  }

  const allowDrop: DragEventHandler = (event) => {
    event.preventDefault();
  }

  const checkWinner = () => {
    if (!board.includes(1) && board.includes(2)) {
      return 2;
    } else if (!board.includes(2) && board.includes(1)) {
      return 1;
    }
    return 0;
  }

  const checkDoubleJump = () => {
    const possibleMoves = !Number.isInteger(board[currentPiece]) ? [
      currentPiece - 7,
      currentPiece - 9,
      currentPiece + 7,
      currentPiece + 9,
    ] : turn === 1 ? [
      currentPiece - 7,
      currentPiece - 9,
    ] : [
      currentPiece + 7,
      currentPiece + 9,
    ];
    const possibleJumps = possibleMoves.map(value => 
      currentPiece + 2 * (value - currentPiece)
    );
    let possibleDoubleJumps: number[] = [];

    for (let i = 0; i < possibleMoves.length; i++) {
      const move = possibleMoves[i];
      const jump = possibleJumps[i];
      if (Math.floor(board[move]) === (turn === 1 ? 2 : 1) && board[jump] === 0) {
        possibleDoubleJumps.push(jump);
      }
    }

    return possibleDoubleJumps;
  }

  const findMid = (pos1: number, pos2: number) => {
    return pos1 - ((pos1 - pos2) / 2);
  }

  const drop: DragEventHandler = (event) => {
    event.preventDefault();
    const targetSpace = parseInt(event.currentTarget.id);
    if (turn !== Math.floor(board[currentPiece])) {return}
    if (board[targetSpace] !== 0) {return}

    const possibleMoves = !Number.isInteger(board[currentPiece]) ? [
      currentPiece - 7,
      currentPiece - 9,
      currentPiece + 7,
      currentPiece + 9,
    ] : doubleJump.length ? [

    ] : turn === 1 ? [
      currentPiece - 7,
      currentPiece - 9,
    ] : [
      currentPiece + 7,
      currentPiece + 9,
    ];
    const possibleJumps = doubleJump.length ? 
      doubleJump : 
      possibleMoves.map(value => 
      currentPiece + 2 * (value - currentPiece)
    );

    if (possibleMoves.includes(targetSpace)) {
      board[targetSpace] = board[currentPiece];
      board[currentPiece] = 0;
    } else if (possibleJumps.includes(targetSpace) && Math.floor(board[findMid(currentPiece, targetSpace)]) === (turn === 1 ? 2 : 1)) {
      board[targetSpace] = board[currentPiece];
      board[findMid(currentPiece, targetSpace)] = 0;
      board[currentPiece] = 0;
    } else {
      return;
    }

    if (turn === 1 && targetSpace < 8) {
      board[targetSpace] = 1.5;
    } else if (turn === 2 && targetSpace >= 56) {
      board[targetSpace] = 2.5;
    }

    setWinner(checkWinner());
    currentPiece = targetSpace;
    setDoubleJump(possibleJumps.includes(targetSpace) ? checkDoubleJump() : []);

    if (!(possibleJumps.includes(targetSpace) && checkDoubleJump())) {
      setTurn(turn === 1 ? 2 : 1);
    }
  }

  const drag: DragEventHandler = (event) => {
    event.preventDefault();
    currentPiece = parseInt(event.currentTarget.parentElement!.id);
  }

  return (
    <div className="board-container">
      <div className="board-label">
        Checkers
      </div>
      <div className="checkerboard">
        {board.map((value, index) => 
          <div id={index.toString()} onDrop={drop} onDragOver={allowDrop}>
            {value > 0 ? 
              Number.isInteger(value) ? 
              <div className={`piece player-${value}`} 
                onDrag={drag} draggable={turn === value ? true : false}>  
              </div> : 
              <div className={`piece player-${Math.floor(value)}`}
                onDrag={drag} draggable={turn === Math.floor(value) ? true : false}>
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
          doubleJump.length ?
          `Player ${turn}'s Double Jump!` :
          `Player ${turn}'s turn`
        }
      </div>
    </div>
  );
}