import React, { useState, useEffect } from "react";
import ManaPotion from "./ManaPotion";
import SpellBook from "./SpellBook";
import Inventory from "./Inventory";
import Player from "./Player";
import Stats from "./Stats";
import "./App.css";

function App() {
  const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 300 }); // add a state variable for the player's position
  const [inventory, setInventory] = useState({ manaPotion: 0 });
  const [activeSpells, setActiveSpells] = useState([]);
  const [health, setHealth] = useState(100);
  const [mana, setMana] = useState(120); // adjust the initial value as needed
  const [manaPotions, setManaPotions] = useState(
    Array(3)
      .fill()
      .map(() => ({ x: Math.random() * 500, y: Math.random() * 500 }))
  );
  const castSpell = () => {
    setMana((prevMana) => prevMana - 10);
  };
  const collectItem = (item) => {
    setInventory((prevInventory) => ({
      ...prevInventory,
      [item]: prevInventory[item] + 1,
    }));
  };
  const useItem = (item) => {
    if (item === "manaPotion" && inventory.manaPotion > 0 && mana < 120) {
      setMana(120); // set mana back to 120
      setInventory((prevInventory) => ({
        ...prevInventory,
        manaPotion: prevInventory.manaPotion - 1, // decrease the number of mana potions
      }));
    }
  };

  useEffect(() => {
    console.log("Player position:", playerPosition);
    console.log("Potion positions:", manaPotions);
    const collidedPotionIndex = manaPotions.findIndex(
      (potion) =>
        Math.abs(potion.x - playerPosition.x) < 75 &&
        Math.abs(potion.y - playerPosition.y) < 75
    );

    if (collidedPotionIndex !== -1) {
      collectItem("manaPotion");
      setManaPotions(
        manaPotions.filter((potion, index) => index !== collidedPotionIndex)
      );
    }
  }, [playerPosition, manaPotions]);
  return (
    <div className="app">
      <div className="canvas">
        {manaPotions.map((manaPotion, index) => (
          <ManaPotion
            key={index}
            style={{
              position: "absolute",
              left: `${manaPotion.x}px`,
              top: `${manaPotion.y}px`,
            }}
          />
        ))}
        <Inventory inventory={inventory} UseItem={useItem} />
        <Stats health={health} mana={mana} className="stats" />

        <Player
          className="player"
          position={playerPosition}
          setPosition={setPlayerPosition}
          collectItem={collectItem}
        />
      </div>
      <SpellBook
        setActiveSpells={setActiveSpells}
        mana={mana}
        setMana={setMana}
        castSpell={castSpell}
      />
    </div>
  );
}

export default App;
