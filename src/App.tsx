import React, { useEffect, useState } from 'react';
// I changed HashRouter for BrowserRouter just because testing in the address bar.
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import { styled } from 'styled-components';

// components
import Home from './Components/Pages/Home';
import Profile from './Components/Pages/Profile';
import Settings from './Components/Pages/Settings';
import LeftSidebar from './Components/Generic/LeftSidebar';
import Followers from './Components/Pages/Follows/Followers';
import Following from './Components/Pages/Follows/Following';
import Login from './Components/Pages/Login';

// firebase
import { auth, loadInputs, loadUserData } from './firebase/config';

// context providers
import { UserProvider } from './Context/UserContext';
import { InputsProvider } from './Context/InputsContext';

const StyledDiv = styled.div `
  position: relative;
  display: flex;
  justify-content: center;
  gap: 5rem;

  > div:first-child{
    width: 0px;
  }

  > div:nth-child(2){
    /* flex: 1 1 50%; */
    width: min(65ch, 100%);
    border: 1px solid var(--color-border);

    > h1{
      padding-left: 16px;
    }
  }
  
  .full-overlay{
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 10;
  }

`;


interface UserData {
  name: string;
  profilImg: string;
  coverImg: string;
  inputs: any[];
  username: string;
  bio: string;
  following: any[];
  followers: any[];
  email: string;
  creationData: string;
  uid: string
}


function App() {

  const [overlayDisplay, setOverlayDisplay] = useState(false)
  const [displaySubMenu, setDisplaySubMenu] = useState(false)
  const [logged, setLogged] = useState(false)

  // for context
  const [userDataState, setUserDataState] = useState<UserData | null>(null);
  const [inputsState, setInputsState] = useState<Array<any> | null>(null);

  useEffect(() => {
    const checkLoggedInStatus = () => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          setLogged(true);

           // Le pasabmos el uid directamente
           // pero como ahora el identificador es el email se ha cambiado eso
          loadUserData(user.email?.split('@')[0]).then((userData: any) => {
            const updatedUserData = {
              ...userData,
              uid: user.uid
            };
            setUserDataState(updatedUserData);
          });

          loadInputs().then(inputs => setInputsState(inputs))
          

        } else {
          setLogged(false);
        }
      });
    };

    checkLoggedInStatus();
  }, []);

  
  const overlayClickHandler = () => {
    setOverlayDisplay(false)
    setDisplaySubMenu(false)
  }

  return (
    <BrowserRouter >
        { logged ?
          <StyledDiv className="App">
            <UserProvider userDataState={userDataState} setUserDataState={setUserDataState}>
                  <LeftSidebar
                    setOverlayDisplay={setOverlayDisplay}
                    displaySubMenu={displaySubMenu}
                    setDisplaySubMenu={setDisplaySubMenu}
                  />
                  <InputsProvider inputsState={inputsState} setInputsState={setInputsState}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/:username" element={<Profile />} />
                        <Route path="/profile/following" element={<Followers />} />
                        <Route path="/profile/followers" element={<Following />} />
                        <Route path="/settings" element={<Settings />} />
                    </Routes >
                  </InputsProvider>
          { overlayDisplay && <div onClick={overlayClickHandler} className="full-overlay"></div> }
        </UserProvider>
      </StyledDiv> 
      // if user is not logged, login screen will be displayed
      : <Login setLogged={setLogged} setuserDataState={setUserDataState}/>}
    </BrowserRouter>
  );
}

export default App;
