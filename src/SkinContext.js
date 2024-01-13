import React from "react";

export const SkinContext = React.createContext();

export function SkinProvider({ children }) {
  const [currentSkin, setCurrentSkin] = React.useState("wizardred1.gif");

  return (
    <SkinContext.Provider value={{ currentSkin, setCurrentSkin }}>
      {children}
    </SkinContext.Provider>
  );
}
