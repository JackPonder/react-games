import { db } from "../firebaseConfig";
import { doc, onSnapshot, updateDoc, arrayUnion } from "firebase/firestore";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useUser } from "../hooks/useUser";

import Sidebar from "../components/Sidebar";
import Board from "../components/Board";
import Chat from "../components/Chat";

export default function Game() {
  const {user} = useUser();
  const {roomId} = useParams();
  const [gameData, setGameData] = useState({
    board: Array(42).fill(0),
    players: [],
    turn: 1,
    winner: 0,
    messages: [],
  });
  
  const docRef = doc(db, "rooms", roomId);

  onSnapshot(docRef, doc => {
    setGameData(doc.data());
    const players = doc.data().players;
    if (user && !players.includes(user.displayName) && players.length < 2) {
      updateDoc(docRef, {players: arrayUnion(user.displayName)});
    }
  });

  return (
    <div className="container">
      <Sidebar />
      <Board docRef={docRef} gameVariables={gameData} />
      <Chat docRef={docRef} messages={gameData.messages} />
    </div>
  );
}
