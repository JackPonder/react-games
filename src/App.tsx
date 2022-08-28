import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import ConnectFour from "./components/ConnectFour";
import Checkers from "./components/Checkers";
import InfoBox from "./components/InfoBox";

import './styles/App.css';

export default function App() {
  return (
    <div className="container">
      <Sidebar />
      <BrowserRouter>
        <Routes>
          <Route path="/connect-four" element={<ConnectFour/>} />
          <Route path="/checkers" element={<Checkers/>} />
          <Route path="*" element={<Navigate to="/connect-four" />} />
        </Routes>
      </BrowserRouter>
      <InfoBox />
    </div>
  );
}
