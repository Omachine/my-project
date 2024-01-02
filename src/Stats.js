// Stats.js
import React from "react";

function Stats({ health, mana }) {
  return (
    <div className="stats">
      <div className="health">{health}</div>
      <div className="mana">{mana}</div>
    </div>
  );
}

export default Stats;
