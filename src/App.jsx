import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import UserProvider from "./hooks/useUser";
import Game from "./pages/Game";
import Home from "./pages/Home";
import "./styles/App.css";

export default function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/games/:roomId" element={<Game/>} />
          <Route path="*" element={<Navigate to="/"/>} />
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
}
