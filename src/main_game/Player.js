import React, { useEffect, useState } from "react";

import { SkinContext } from "../SkinContext";

function Player({ position, setPosition, speed,setspeed }) {
  const [key, setKey] = useState(null);
  const [facingRight, setFacingRight] = useState(true);
  const playerWidth = 128; // player width in pixels
  const playerHeight = 128; // player height in pixels
  const mapWidth = window.innerWidth * 0.85; // map width in pixels, 85% of the screen width
  const mapHeight = window.innerHeight * 0.99; // map height in pixels
  const { currentSkin, setCurrentSkin } = React.useContext(SkinContext);


  useEffect(() => {
    const handleKeyDown = (event) => {
      setKey(event.key);
      // update player position based on key press
      setspeed=(10);
      if (event.key === "ArrowRight" || event.key === "d") {
        setPosition((prevPosition) => ({
          ...prevPosition,
          x: Math.min(prevPosition.x + setspeed, mapWidth - playerWidth),
        }));
        setFacingRight(true);
      } else if (event.key === "ArrowLeft" || event.key === "a") {
        setPosition((prevPosition) => ({
          ...prevPosition,
          x: Math.max(prevPosition.x - setspeed, 0),
        }));
        setFacingRight(false);
      } else if (event.key === "ArrowUp" || event.key === "w") {
        setPosition((prevPosition) => ({
          ...prevPosition,
          y: Math.max(prevPosition.y - setspeed, 0),
        }));
      } else if (event.key === "ArrowDown" || event.key === "s") {
        setPosition((prevPosition) => ({
          ...prevPosition,
          y: Math.min(prevPosition.y + setspeed, mapHeight - playerHeight),
        }));
      }
    };

    const handleKeyUp = () => {
      setKey(null);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [mapHeight, mapWidth, setPosition]);

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
        src={process.env.PUBLIC_URL + "/" + currentSkin}
        alt="Player avatar"
        style={{
          width: "128px",
          height: "128px",
        }}
      />
    </div>
  );
}

export default Player;
