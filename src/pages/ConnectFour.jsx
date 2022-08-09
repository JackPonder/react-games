import { db } from "../firebaseConfig";
import { doc, onSnapshot } from "firebase/firestore";
import { useState } from "react";

import Sidebar from "../components/Sidebar";
import Board from "../components/Board";
import Chat from "../components/Chat";

export default function ConnectFour() {
  const [gameVariables, setGameVariables] = useState({
    board: Array(42).fill(0),
    players: [],
    turn: 1,
    winner: 0,
    messages: [],
  });
  
  const roomId = "test-room";
  const docRef = doc(db, "rooms", roomId);

  onSnapshot(docRef, doc => {
    setGameVariables(doc.data());
  });

  return (
    <div className="container">
      <Sidebar />
      <Board docRef={docRef} gameVariables={gameVariables} />
      <Chat docRef={docRef} messages={gameVariables.messages} />
    </div>
  );
}
