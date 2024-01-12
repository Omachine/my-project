import React from "react";

function Inventory({ inventory, UseItem }) {
  return (
    <div className="inventory">
      <p>Mana Potions: {inventory.manaPotion}</p>
      <button onClick={() => UseItem("manaPotion")}>Use Mana Potion</button>
      <p>Speed Potions: {inventory.manaPotion}</p>
      <button onClick={() => UseItem("speedPotion")}>Use Speed Potion</button>
      <p>Power Potions: {inventory.manaPotion}</p>
      <button onClick={() => UseItem("powerPotion")}>Use Power Potion</button>
    </div>
  );
}

export default Inventory;
