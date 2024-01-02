// Player.js
import React, { useState, useEffect } from "react";
import "./Player.css";
import Stats from "./Stats";

function Player(props) {
  const [position, setPosition] = useState({ x: 0, y: 300 }); // initial position
  const [facingRight, setFacingRight] = useState(true);
  const [key, setKey] = useState(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      setKey(event.key);
    };

    const handleKeyUp = (event) => {
      setKey(null);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    const interval = setInterval(() => {
      switch (key) {
        case "w":
          setPosition((pos) => ({ ...pos, y: pos.y - 10 }));
          break;
        case "s":
          setPosition((pos) => ({ ...pos, y: pos.y + 10 }));
          break;
        case "a":
          setPosition((pos) => ({ ...pos, x: pos.x - 10 }));
          setFacingRight(true); // changed to true
          break;
        case "d":
          setPosition((pos) => ({ ...pos, x: pos.x + 10 }));
          setFacingRight(false); // changed to false
          break;
        default:
          break;
      }
    }, 50);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      clearInterval(interval);
    };
  }, [key]);

  return (
    <div
      className="player"
      style={{
        position: "absolute",
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: facingRight ? "scaleX(1)" : "scaleX(-1)",
      }}
    >
      <img
        src={process.env.PUBLIC_URL + "/Pixel-mage.gif"} // ensure the path is correct
        alt="Player avatar"
        style={{
          width: "128px", // increase the size
          height: "128px", // increase the size
        }}
      />
      <Stats health={props.health} score={props.score} />
    </div>
  );
}
export default Player;
