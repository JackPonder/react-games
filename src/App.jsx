import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserProvider from "./hooks/useUser";
import ConnectFour from "./pages/ConnectFour";
import "./styles/App.css";

export default function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route path="*" element={<ConnectFour />} />
        </Routes>        
      </UserProvider>
    </BrowserRouter>
  );
}
