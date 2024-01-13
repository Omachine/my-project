import React from "react";
import { SkinContext } from "../SkinContext";
import "./Spells.css";

function Spells({ mana, setMana }) {
  const spells = ["Fire", "Ice", "Grass"]; // Add more spells here
  const { setCurrentSkin } = React.useContext(SkinContext);

  return (
    <div className="spell-buttons">
      {spells.map((spell, index) => (
        <button
          key={index}
          className={`spell-button spell-button-${spell.toLowerCase()}`}
          onClick={() => {
            if (mana >= 10) {
              // check if there's enough mana to cast the spell
              setMana(mana - 10); // reduce the mana by 10
              if (spell === "Fire") {
                setCurrentSkin("wizardred1.gif");
              } else if (spell === "Ice") {
                setCurrentSkin("wizardblue1.gif");
              } else if (spell === "Grass") {
                setCurrentSkin("wizardgreen1.gif");
              }
            }
          }}
        >
          {spell}
        </button>
      ))}
    </div>
  );
}

export default Spells;
