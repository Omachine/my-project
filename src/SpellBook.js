import React from "react";
import Spells from "./Spells";
import "./SpellBook.css";

function SpellBook({ castSpell }) {
  // Destructure castSpell from the props object here
  return (
    <div className="spellbook">
      <h2>Spellbook</h2>
      <Spells castSpell={castSpell} />
    </div>
  );
}

export default SpellBook;
