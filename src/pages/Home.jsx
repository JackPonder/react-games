import Sidebar from "../components/Sidebar";
import Board from "../components/Board";
import InfoBox from "../components/InfoBox";

export default function Home() {
  const sampleGame = {
    board: Array(42).fill(0),
    players: [],
    turn: 0,
    winner: 0,
  };

  return (
    <div className="container">
      <Sidebar/>
      <Board gameVariables={sampleGame}/>
      <InfoBox/>
    </div>
  )
}