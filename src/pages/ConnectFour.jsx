import { db, auth } from "../firebaseInit";
import { doc, setDoc, onSnapshot } from "firebase/firestore";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { TbCrown } from "react-icons/tb";

import Sidebar from "../components/Sidebar";

export default function ConnectFour() {
  const [board, setBoard] = useState(Array(42).fill(0));
  const [players, setPlayers] = useState([]);
  const [turn, setTurn] = useState(1);
  const [winner, setWinner] = useState(0);
  const {roomId} = useParams();

  const docRef = doc(db, "rooms", roomId);

  useEffect(() => {
    onSnapshot(docRef, doc => {
      setBoard(doc.data().board);
      setTurn(doc.data().turn);
      setWinner(doc.data().winner);
      setPlayers(doc.data().players)
    })  
  }, [docRef])

  const resetBoard = () => {
    if (!winner) return;
    setDoc(docRef, { 
      board: Array(42).fill(0), 
      turn: 1, 
      winner: 0 
    }, { merge: true });
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
    if (players[turn - 1] !== auth.currentUser?.displayName) return;

    let target = parseInt(event.target.id);
    while (board[target + 7] === 0) target += 7;
    board[target] = turn;

    setDoc(docRef, { 
      board,
      winner: checkWinner(),
      turn: turn === 1 ? 2 : 1
    }, { merge: true });
  }

  return (
    <div className="container">
      <Sidebar />
      <div className="board-container">
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
      </div>
    </div>
  );
}
