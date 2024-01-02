import React, { useState } from "react";
import Player from "./Player";
import Spellbook from "./SpellBook";
import "./App.css";
import Stats from "./Stats";

function App() {
  const [health, setHealth] = useState(100);
  const [mana, setMana] = useState(90); // adjust the initial value as needed

  const castSpell = () => {
    setMana((prevMana) => prevMana - 10);
  };

  return (
    <div className="app">
      <div className="canvas">
        <Stats health={health} mana={mana} className="stats" />
        <Player className="player" />
      </div>
      <Spellbook castSpell={castSpell} />
    </div>
  );
}

export default App;
