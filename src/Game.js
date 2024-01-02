// Game.js
import React, { Component } from "react";
import Player from "./Player";

class Game extends Component {
  const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 0 });
  // game logic goes here
  render() {
    return (
      <div>
        <Player />
      </div>
    );
  }
}

export default Game;
