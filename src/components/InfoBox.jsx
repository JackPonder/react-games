import { db } from "../firebaseConfig";
import { collection, doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";

import "../styles/InfoBox.css";

export default function InfoBox() {
  const {user} = useUser();
  const navigate = useNavigate();

  const createRoom = async () => {
    if (!user) return;

    const docRef = doc(collection(db, "rooms"));
    await setDoc(docRef, {
      board: Array(42).fill(0),
      players: [user.displayName],
      turn: 1,
      winner: 0,
      messages: [],
    });

    const roomId = docRef.id;
    navigate(`/games/${roomId}`);
  }

  return (
    <div className="info-box">
      <h2>Play Game</h2>
      <button className="btn btn-large" onClick={createRoom}>
        Play a Friend
      </button>
      <button className="btn btn-large">
        Play vs. Computer
      </button>
    </div>
  )
}