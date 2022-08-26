import Sidebar from "./components/Sidebar";
import Board from "./components/ConnectFour";
import InfoBox from "./components/InfoBox";

import './styles/App.css';

export default function App() {
  return (
    <div className="container">
      <Sidebar />
      <Board />
      <InfoBox />
    </div>
  );
}
