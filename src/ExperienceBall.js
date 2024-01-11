import React from "react";
function ExperienceBall({ x, y }) {
  return (
    <img
      src="/exp.png" // path relative to the public folder
      alt="Experience Ball"
      style={{
        position: "absolute",
        left: `${x}px`,
        top: `${y}px`,
        width: "50px",
        height: "50px",
      }}
    />
  );
}

export default ExperienceBall;
