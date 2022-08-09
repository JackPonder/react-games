import { auth, db } from "../firebaseConfig";
import { doc, onSnapshot } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useState } from "react";

import Sidebar from "../components/Sidebar";
import Board from "../components/Board";
import Chat from "../components/Chat";

export default function ConnectFour() {
  const [user, setUser] = useState();
  const [messages, setMessages] = useState([]);
  const [gameVariables, setGameVariables] = useState({
    board: Array(42).fill(0),
    players: [],
    turn: 1,
    winner: 0,
  })
  
  const roomId = "test-room";
  const docRef = doc(db, "rooms", roomId);

  onAuthStateChanged(auth, user => {
    setUser(user);
  });

  onSnapshot(docRef, doc => {
    setMessages(doc.data().messages);
    setGameVariables({
      board : doc.data().board,
      turn : doc.data().turn,
      winner: doc.data().winner,
      players: doc.data().players,
    });
  });

  return (
    <div className="container">
      <Sidebar user={user} />
      <Board docRef={docRef} user={user} gameVariables={gameVariables} />
      <Chat docRef={docRef} user={user} messages={messages} />
    </div>
  );
}
