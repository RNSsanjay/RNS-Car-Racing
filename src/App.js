import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components/Home";
import RacingGame from "./components/RacingGame";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/racing-game" element={<RacingGame />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
