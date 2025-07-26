import { createContext, useContext, useState, ReactNode } from "react";

type GlobalStateType = {
  track: string;
  setTrack: (track: string) => void;
  selectedTrack: string;
  setSelectedTrack:(selectedTrack : string)=>void;
};

const GlobalContext = createContext<GlobalStateType | undefined>(undefined);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [track, setTrack] = useState("");
  const [selectedTrack, setSelectedTrack] = useState<string | null>(null);

  return (
    <GlobalContext.Provider value={{ track, setTrack,selectedTrack,setSelectedTrack}}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobal = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobal must be used within a GlobalProvider");
  }
  return context;
};
