import React, { createContext, Dispatch, SetStateAction } from 'react';


interface UserData {
  name: string;
  profilImg: string;
  coverImg?: string;
  inputs: any[];
  username: string;
  bio: string;
  following: any[];
  followers: any[];
  email: string;
  creationData: string;
  uid: string
}

interface UserContextProps {
    userDataState: UserData | null;
    setUserDataState: Dispatch<SetStateAction<UserData | null>>;
  }

  export const UserContext = createContext<UserContextProps>({
    userDataState: null,
    setUserDataState: () => {},
  });

  export const UserProvider: React.FunctionComponent<React.PropsWithChildren<UserContextProps>> = ({
    userDataState,
    setUserDataState,
    children,
  }) => {
    return (
      <UserContext.Provider value={{ userDataState, setUserDataState }}>
        {children}
      </UserContext.Provider>
    );
  };