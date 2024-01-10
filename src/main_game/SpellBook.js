import React from "react";
import Spells from "./Spells";
import "./SpellBook.css";

function SpellBook({ mana, setMana, castSpell, setActiveSpells }) {
  return (
    <div className="spellbook">
      <h2>Spellbook</h2>
      <Spells
        setActiveSpells={setActiveSpells}
        Spells
        mana={mana}
        setMana={setMana}
        castSpell={castSpell}
      />
    </div>
  );
}

export default SpellBook;
