import React, { useRef, useEffect, useCallback, useContext, createContext, ReactNode } from "react";

// Sound context
interface SoundContextType {
  globalVolume: number;
  setGlobalVolume: (volume: number) => void;
}

export const SoundContext = createContext<SoundContextType | null>(null);

export function SoundProvider({ children }: { children: ReactNode }) {
  const [globalVolume, setGlobalVolume] = React.useState(0.5);
  return (
    <SoundContext.Provider value={{ globalVolume, setGlobalVolume }}>
      {children}
    </SoundContext.Provider>
  );
};
