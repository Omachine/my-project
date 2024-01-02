import React from "react";

function Inventory({ inventory, UseItem }) {
  return (
    <div className="inventory">
      <p>Mana Potions: {inventory.manaPotion}</p>
      <button onClick={() => UseItem("manaPotion")}>Use Mana Potion</button>
    </div>
  );
}

export default Inventory;
