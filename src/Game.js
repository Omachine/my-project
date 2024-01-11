import React, { useState, useEffect } from "react";
import ManaPotion from "./main_game/ManaPotion";
import SpellBook from "./main_game/SpellBook";
import Inventory from "./main_game/Inventory";
import Player from "./main_game/Player";
import Stats from "./main_game/Stats";
import ExperienceBall from "./ExperienceBall";
import FireBall from './fireBall';

function Game() {
  const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 300 }); // add a state variable for the player's position
  const [inventory, setInventory] = useState({ manaPotion: 0 });
  const [activeSpells, setActiveSpells] = useState([]);
  const [health, setHealth] = useState(100);
  const [mana, setMana] = useState(120); // adjust the initial value as needed
  const [level, setLevel] = useState(1);
  const [experience, setExperience] = useState(0);
  const [manaPotions, setManaPotions] = useState(
    Array(3)
      .fill()
      .map(() => ({ x: Math.random() * 1000, y: Math.random() * 1000 }))
  );
  const [experienceBalls, setExperienceBalls] = useState([]);
  const castSpell = () => {
    setMana((prevMana) => prevMana - 10);
  };
  const collectItem = (item) => {
    setInventory((prevInventory) => ({
      ...prevInventory,
      [item]: prevInventory[item] + 1,
    }));
  };
  const collectExperienceBall = () => {
    setExperience((prevExperience) => {
      const newExperience = prevExperience + 1;
      if (newExperience >= 10) {
        setLevel((prevLevel) => prevLevel + 1);
        return newExperience % 10;
      }
      return newExperience;
    });
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
    //console.log("Player position:", playerPosition);
    //console.log("Potion positions:", manaPotions);
    const intervalId = setInterval(() => {
      setExperienceBalls((prevExperienceBalls) => [
        ...prevExperienceBalls,
        { x: Math.random() * 1000, y: Math.random() * 1000 },
      ]);
    }, 15000); // 10000 milliseconds = 10 seconds
    const collidedPotionIndex = manaPotions.findIndex(
      (potion) =>
        Math.abs(potion.x - 30 - playerPosition.x) < 75 &&
        Math.abs(potion.y - 30 - playerPosition.y) < 75
    );
    const collidedExperienceBallIndex = experienceBalls.findIndex(
      (experienceBall) =>
        Math.abs(experienceBall.x - 30 - playerPosition.x) < 75 &&
        Math.abs(experienceBall.y - 30 - playerPosition.y) < 75
    );

    if (collidedPotionIndex !== -1) {
      collectItem("manaPotion");
      setManaPotions(
        manaPotions.filter((potion, index) => index !== collidedPotionIndex)
      );
    }
    if (collidedExperienceBallIndex !== -1) {
      setExperienceBalls((prevExperienceBalls) =>
        prevExperienceBalls.filter(
          (_, index) => index !== collidedExperienceBallIndex
        )
      );
      collectExperienceBall();
    }
    return () => clearInterval(intervalId);
  }, [playerPosition, manaPotions, experienceBalls]);

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
        {experienceBalls.map((experienceBall, index) => (
          <ExperienceBall
            key={index}
            x={experienceBall.x}
            y={experienceBall.y}
          />
        ))}
        <Inventory inventory={inventory} UseItem={useItem} />
        <Stats
          health={health}
          mana={mana}
          level={level}
          experience={experience}
        />

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

export default Game;
