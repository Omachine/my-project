import React, { useState } from "react";
import "./Spells.css";

function Spells({ castSpell }) {
  // Destructure castSpell from the props object here
  const spells = ["Fire", "Ice", "Wind", "Earth"];
  const [activeSpells, setActiveSpells] = useState([]);

  const shootSpell = (spell, color) => {
    const newSpell = { type: spell, color: color };
    setActiveSpells((prevSpells) => [...prevSpells, newSpell]);

    castSpell();
  };

  return (
    <div className="spell-container">
      {spells.map((spell, index) => (
        <button
          key={index}
          className={`spell-button spell-button-${spell.toLowerCase()}`}
          onClick={() => shootSpell(spell, spell.toLowerCase())}
          onBlur={() => window.focus()}
        >
          {spell}
        </button>
      ))}
    </div>
  );
}

export default Spells;
