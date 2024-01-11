import React, { useState } from "react";
import "./Spells.css";

function Spells({ mana, setMana, setActiveSpells, castSpell }) {
  // Destructure castSpell from the props object here
  const spells = ["Fire", "Ice", "Grass"];

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
          onClick={() => {
            if (mana >= 10) {
              // check if there's enough mana to cast the spell

              setMana(mana - 10); // reduce the mana by 10
              if (spell === "Fire") {

              }
            }
          }}
          onBlur={() => window.focus()}
        >
          {spell}
        </button>
      ))}
    </div>
  );
}

export default Spells;


