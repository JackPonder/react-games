import './App.css';

export default function App() {
  return (
    <div className="App">
      <div className="board">
        {Array(48).fill().map(() => <div className="grid-space" /> )}
      </div>   
    </div>
  );
}
