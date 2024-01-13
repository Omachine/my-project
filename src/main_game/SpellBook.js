import React, { useState } from "react";
import Spells from "./Spells";
import "./SpellBook.css";

function SpellBook({ mana, setMana, castSpell, setActiveSpells }) {
  const setCurrentSkin = useState("wizardred1.gif");

  return (
    <div className="spellbook">
      <h2>Spellbook</h2>
      <Spells
        setCurrentSkin={setCurrentSkin}
        setActiveSpells={setActiveSpells}
        mana={mana}
        setMana={setMana}
        castSpell={castSpell}
      />
    </div>
  );
}

export default SpellBook;
