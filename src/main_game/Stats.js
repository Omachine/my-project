// Stats.js
import React from "react";

function Stats({ health, mana, level, experience }) {
  return (
    <div className="stats">
      <div className="health">{health}</div>
      <div className="mana">{mana}</div>
      <div className="level">Level: {level}</div>
      <div className="experience">Experience: {experience}/10</div>
    </div>
  );
}

export default Stats;
