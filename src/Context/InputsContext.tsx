import React, { createContext, Dispatch, SetStateAction } from 'react';

interface InputsContextProps {
    inputsState: Array<any> | null;
    setInputsState: Dispatch<SetStateAction<Array<any> | null>>;
  }

  export const InputsContext = createContext<InputsContextProps>({
    inputsState: null,
    setInputsState: () => {},
  });

  export const InputsProvider: React.FunctionComponent<React.PropsWithChildren<InputsContextProps>> = ({
    inputsState,
    setInputsState,
    children,
  }) => {
    return (
      <InputsContext.Provider value={{ inputsState, setInputsState }}>
        {children}
      </InputsContext.Provider>
    );
  };