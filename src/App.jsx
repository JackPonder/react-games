import { BrowserRouter, Routes, Route } from "react-router-dom";
import ConnectFour from "./pages/ConnectFour";
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/connect-four/:roomId" element={<ConnectFour />} />
      </Routes>
    </BrowserRouter>
  );
}
