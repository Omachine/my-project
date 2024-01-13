import React, { useState, useEffect } from "react";
import ManaPotion from "./main_game/ManaPotion";
import PowerPotion from "./main_game/PowerPotion";
import SpeedPotion from "./main_game/SpeedPotion";
import SpellBook from "./main_game/SpellBook";
import Inventory from "./main_game/Inventory";
import Player from "./main_game/Player";
import Stats from "./main_game/Stats";
import ExperienceBall from "./ExperienceBall";

function Game() {
  const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 300 }); // add a state variable for the player's position
  const [inventory, setInventory] = useState({
    manaPotion: 0,
    speedPotion: 0,
    powerPotion: 0,
  });
  const [activeSpells, setActiveSpells] = useState([]);
  const [health, setHealth] = useState(100);
  const [mana, setMana] = useState(120); // adjust the initial value as needed
  const [level, setLevel] = useState(1);
  const [experience, setExperience] = useState(0);
  const [speed, setspeed] = useState(10);

  const [manaPotions, setManaPotions] = useState(
    Array(2)
      .fill()
      .map(() => ({
        x: Math.random() * window.innerWidth * 0.85 - 23,
        y: Math.random() * window.innerHeight - 26,
        type: "mana",
      }))
  );
  const [powerPotions, setPowerPotions] = useState(
    Array(2)
      .fill()
      .map(() => ({
        x: Math.random() * window.innerWidth * 0.85 - 23,
        y: Math.random() * window.innerHeight - 26,
        type: "power",
      }))
  );
  const [speedPotions, setSpeedPotions] = useState(
    Array(2)
      .fill()
      .map(() => ({
        x: Math.random() * window.innerWidth * 0.85 - 23,
        y: Math.random() * window.innerHeight - 26,
        type: "speed",
      }))
  );
  const [experienceBalls, setExperienceBalls] = useState(
    Array(10)
      .fill()
      .map(() => ({
        x: Math.random() * (window.innerWidth * 0.85) - 64,
        y: Math.random() * window.innerHeight - 64,
      }))
  );
  const castSpell = () => {
    setMana((prevMana) => prevMana - 10);
  };
  const collectItem = (item) => {
    console.log("collectItem called with item:", item);
    setInventory((prevInventory) => {
      const newInventory = { ...prevInventory };
      if (item.type === "mana") {
        newInventory.manaPotion = (prevInventory.manaPotion || 0) + 1;
      } else if (item.type === "speed") {
        newInventory.speedPotion = (prevInventory.speedPotion || 0) + 1;
      } else if (item.type === "power") {
        newInventory.powerPotion = (prevInventory.powerPotion || 0) + 1;
      }
      console.log("newInventory:", newInventory);
      return newInventory;
    });
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
        manaPotion: prevInventory.manaPotion - 1,
      }));
    }else if (item === "speedPotion" && inventory.speedPotion > 0){
      setspeed(20);
      setTimeout(() => {
        setspeed(10)
      }, 5000)
      setInventory((prevInventory) => ({
        ...prevInventory,
        speedPotion: prevInventory.speedPotion - 1,
      }));
    };
  }

  const intervalId = setInterval(() => {
    setExperienceBalls((prevExperienceBalls) => {
      if (prevExperienceBalls.length < 15) {
        return [
          ...prevExperienceBalls,
          {
            x: Math.random() * (window.innerWidth * 0.85) - 64,
            y: Math.random() * window.innerHeight - 64,
          },
        ];
      } else {
        return prevExperienceBalls;
      }
    });
  }, 15000); // 15000 milliseconds = 15 seconds

  useEffect(() => {
    const intervalId = setInterval(() => {
      setExperienceBalls((prevExperienceBalls) => {
        if (prevExperienceBalls.length < 15) {
          return [
            ...prevExperienceBalls,
            {
              x: Math.random() * (window.innerWidth * 0.85) - 64,
              y: Math.random() * window.innerHeight - 64,
            },
          ];
        } else {
          return prevExperienceBalls;
        }
      });
    }, 15000); // 15000 milliseconds = 15 seconds
    const handlePotionCollision = (potionList, type) => {
      const collidedPotionIndex = potionList.findIndex(
        (potion) =>
          potion.type === type &&
          Math.abs(potion.x - 30 - playerPosition.x) < 75 &&
          Math.abs(potion.y - 30 - playerPosition.y) < 75
      );

      if (collidedPotionIndex !== -1) {
        collectItem(potionList[collidedPotionIndex]);
        potionList.splice(collidedPotionIndex, 1);
        return true;
      }
      return false;
    };

    const handleExperienceBallCollision = () => {
      const collidedExperienceBallIndex = experienceBalls.findIndex(
        (experienceBall) =>
          Math.abs(experienceBall.x - 30 - playerPosition.x) < 75 &&
          Math.abs(experienceBall.y - 30 - playerPosition.y) < 75
      );

      if (collidedExperienceBallIndex !== -1) {
        setExperienceBalls((prevExperienceBalls) =>
          prevExperienceBalls.filter(
            (_, index) => index !== collidedExperienceBallIndex
          )
        );
        collectExperienceBall();
      }
    };

    const handlePotionCollisions = () => {
      if (handlePotionCollision(manaPotions, "mana")) {
        setManaPotions([...manaPotions]); // Force re-render
      }

      if (handlePotionCollision(powerPotions, "power")) {
        setPowerPotions([...powerPotions]); // Force re-render
      }

      if (handlePotionCollision(speedPotions, "speed")) {
        setSpeedPotions([...speedPotions]); // Force re-render
      }
    };

    handlePotionCollisions();
    handleExperienceBallCollision();

    return () => clearInterval(intervalId);
  }, [
    playerPosition,
    manaPotions,
    powerPotions,
    speedPotions,
    experienceBalls,
  ]);

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
        {powerPotions.map((powerPotion, index) => (
          <PowerPotion
            key={index}
            style={{
              position: "absolute",
              left: `${powerPotion.x}px`,
              top: `${powerPotion.y}px`,
            }}
          />
        ))}
        {speedPotions.map((speedPotion, index) => (
          <SpeedPotion
            key={index}
            style={{
              position: "absolute",
              left: `${speedPotion.x}px`,
              top: `${speedPotion.y}px`,
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
          speed={speed}
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
