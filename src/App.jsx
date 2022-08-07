import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, onSnapshot } from "firebase/firestore";
import { useState, useEffect } from "react";
import { TbCrown } from "react-icons/tb";
import "./App.css";

const firebaseConfig = {
  apiKey: "AIzaSyBWQVPIoYkddeJ1ivTQaXOf6YeAWcRykLI",
  authDomain: "connect-four-9a87e.firebaseapp.com",
  projectId: "connect-four-9a87e",
  storageBucket: "connect-four-9a87e.appspot.com",
  messagingSenderId: "318177770000",
  appId: "1:318177770000:web:7963e044d52043c015a895",
  measurementId: "G-Q38KG1G4S4"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function App() {
  const [board, setBoard] = useState(Array(42).fill(0));
  const [turn, setTurn] = useState(1);
  const [winner, setWinner] = useState(0);

  useEffect(() => {
    onSnapshot(doc(db, "rooms", "test-room"), doc => {
      setBoard(doc.data().board);
      setTurn(doc.data().turn);
      setWinner(doc.data().winner);
    })
  }, [])

  const resetBoard = () => {
    if (!winner) return;
    setDoc(doc(db, "rooms", "test-room"), { 
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

    let target = parseInt(event.target.id);
    while (board[target + 7] === 0) target += 7;
    board[target] = turn;

    setDoc(doc(db, "rooms", "test-room"), { 
      board,
      winner: checkWinner(),
      turn: turn === 1 ? 2 : 1
    }, { merge: true });
  }

  return (
    <div className="container">
      <div className="sidebar">
        <h1>Connect 4</h1>
        <h2 onClick={resetBoard}>
          {winner ? `Player ${winner} has won! Tap to reset game.` : `Player ${turn}'s Turn`}
        </h2>
      </div>
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
