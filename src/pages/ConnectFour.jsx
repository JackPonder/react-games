import { useParams } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Board from "../components/Board";

export default function ConnectFour() {
  const {roomId} = useParams();

  return (
    <div className="container">
      <Sidebar />
      <Board roomId={roomId} />
    </div>
  );
}
