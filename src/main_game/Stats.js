// Stats.js
import React from "react";

function Stats({ health, mana,speed, level, experience }) {
  return (
    <div className="stats">
      <p>Heath:{health}</p>
      <p>Mana:{mana}</p>
      <p>Speed:{speed}</p>
      <div className="level">Level: {level}</div>
      <div className="experience">Experience: {experience}/10</div>
    </div>
  );
}

export default Stats;
