import React, { useEffect, useState } from "react";

function Player({ position, setPosition }) {
  const [key, setKey] = useState(null);
  const [facingRight, setFacingRight] = useState(true);

  useEffect(() => {
    const handleKeyDown = (event) => {
      setKey(event.key);
      // update player position based on key press
      if (event.key === "ArrowRight" || event.key === "d") {
        setPosition((prevPosition) => ({
          ...prevPosition,
          x: prevPosition.x + 10,
        }));
        setFacingRight(false);
      } else if (event.key === "ArrowLeft" || event.key === "a") {
        setPosition((prevPosition) => ({
          ...prevPosition,
          x: prevPosition.x - 10,
        }));
        setFacingRight(true);
      } else if (event.key === "ArrowUp" || event.key === "w") {
        setPosition((prevPosition) => ({
          ...prevPosition,
          y: prevPosition.y - 10,
        }));
      } else if (event.key === "ArrowDown" || event.key === "s") {
        setPosition((prevPosition) => ({
          ...prevPosition,
          y: prevPosition.y + 10,
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
  }, [setPosition]);

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
        src={process.env.PUBLIC_URL + "/Pixel-mage.gif"}
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
