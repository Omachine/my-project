import React from "react";

function ExperienceBall({ x, y }) {
  return (
    <div
      style={{
        position: "absolute",
        left: `${x}px`,
        top: `${y}px`,
        width: "10px",
        height: "10px",
        backgroundColor: "green",
      }}
    />
  );
}

export default ExperienceBall;
