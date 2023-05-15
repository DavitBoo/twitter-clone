import React, { createContext, useState } from 'react';

interface GlobalState {
  // Define your state properties here
  count: number;
  // ...
}

interface GlobalStateContextProps {
  globalState: GlobalState;
  setGlobalState: React.Dispatch<React.SetStateAction<GlobalState>>;
}

const initialGlobalState: GlobalState = {
  count: 0,
  // ...
};

export const GlobalStateContext = createContext<GlobalStateContextProps>({
  globalState: initialGlobalState,
  setGlobalState: () => {},
});

export const GlobalStateProvider: React.FC = ({ children }) => {
  const [globalState, setGlobalState] = useState<GlobalState>(initialGlobalState);

  return (
    <GlobalStateContext.Provider value={{ globalState, setGlobalState }}>
      {children}
    </GlobalStateContext.Provider>
  );
};