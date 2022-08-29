import { useState, DragEventHandler } from "react";
import { TbCrown } from "react-icons/tb";

import "../styles/Board.css";

export default function Checkers() {
  const [turn, setTurn] = useState(1 as 1 | 2);
  const [winner, setWinner] = useState(0 as 0 | 1 | 2);
  const [doubleJump, setDoubleJump] = useState(0);
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

  let currentPiece = -1;

  const resetGame = () => {
    if (!winner) {return}
    setTurn(1);
    setWinner(0);
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

  const checkDoubleJump = (piece: number) => {
    const possibleMoves = !Number.isInteger(board[piece]) ? [
      piece - 7,
      piece - 9,
      piece + 7,
      piece + 9,
    ] : turn === 1 ? [
      piece - 7,
      piece - 9,
    ] : [
      piece + 7,
      piece + 9,
    ];
    const possibleJumps = possibleMoves.map(value => 
      piece + 2 * (value - piece)
    );

    for (let i = 0; i < possibleMoves.length; i++) {
      const move = possibleMoves[i];
      const jump = possibleJumps[i];
      if (board[move] === (turn === 1 ? 2 : 1) && board[jump] === 0) {
        return jump;
      }
    }

    return 0;
  }

  const findMid = (pos1: number, pos2: number) => {
    return pos1 - ((pos1 - pos2) / 2);
  }

  const drop: DragEventHandler = (event) => {
    event.preventDefault();
    const targetSpace = parseInt(event.currentTarget.id);
    if (turn !== Math.floor(board[currentPiece])) {return}
    if (board[targetSpace]) {return}

    const possibleMoves = !Number.isInteger(board[currentPiece]) ? [
      currentPiece - 7,
      currentPiece - 9,
      currentPiece + 7,
      currentPiece + 9,
    ] : doubleJump ? [

    ] : turn === 1 ? [
      currentPiece - 7,
      currentPiece - 9,
    ] : [
      currentPiece + 7,
      currentPiece + 9,
    ];
    const possibleJumps = doubleJump ? [
      doubleJump
    ] : possibleMoves.map(value => 
      currentPiece + 2 * (value - currentPiece)
    );

    if (possibleMoves.includes(targetSpace)) {
      board[targetSpace] = board[currentPiece];
      board[currentPiece] = 0;
    } else if (possibleJumps.includes(targetSpace) && board[findMid(currentPiece, targetSpace)] === (turn === 1 ? 2 : 1)) {
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
    possibleJumps.includes(targetSpace) ? setDoubleJump(checkDoubleJump(targetSpace)) : setDoubleJump(0);

    if (!(possibleJumps.includes(targetSpace) && checkDoubleJump(targetSpace))) {
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
            {value ? 
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
          doubleJump ?
          `Player ${turn}'s Double Jump!` :
          `Player ${turn}'s turn`
        }
      </div>
    </div>
  );
}