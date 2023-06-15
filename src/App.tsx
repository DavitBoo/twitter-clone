import React, { useEffect, useState } from 'react';
// I changed HashRouter for BrowserRouter just because testing in the address bar.
import { BrowserRouter, Routes, Route, useParams, HashRouter} from "react-router-dom";
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
import MobilNavBar from './Components/Generic/MobilNavBar';

const StyledDiv = styled.div `
  position: relative;
  display: flex;
  justify-content: center;
  gap: 5rem;

  @media (max-width: 768px){
    flex-direction: column;
    align-items: center;  
  }

  > div:first-child{
    width: 0px;
  }

  > div:nth-child(2){
    /* flex: 1 1 50%; */
    /* width: min(65ch, 100%); */
    width: min(100%, 600px);
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
  coverImg?: string;
  inputs: string[];
  username: string;
  bio: string;
  following: string[];
  followers: string[];
  email: string;
  creationData: string;
  uid: string
}


function App() {

  const [overlayDisplay, setOverlayDisplay] = useState(false)
  const [displaySubMenu, setDisplaySubMenu] = useState(false)
  const [logged, setLogged] = useState(false)

  const [loadingUser, setLoadingUser] = useState(false);

  // for context
  const [userDataState, setUserDataState] = useState<UserData | null>(null);
  const [inputsState, setInputsState] = useState<Array<any> | null>(null);

  useEffect(() => {
    const checkLoggedInStatus = () => {
      setLoadingUser(true); // Establecer loadingUser en true

      auth.onAuthStateChanged((user) => {
        if (user) {
          setLogged(true);
          console.log(user)
           // Le pasabmos el uid directamente
           // pero como ahora el identificador es el email se ha cambiado eso
          loadUserData(user.email?.split('@')[0]).then((userData: any) => {
            console.log(userData)
            if (userData) {
              const updatedUserData = {
                ...userData,
                uid: user.uid
              };
              setUserDataState(updatedUserData);
            } else {
              // Establecer userData con un valor predeterminado si es undefined
              const defaultUserData: any = {
                name: user.displayName,
                profilImg: user.photoURL,
                coverImg: "",
                inputs: [],
                username: user.email?.split('@')[0],
                bio: "",
                following: [],
                followers: [],
                email: user.email || "",
                creationData: 'welcome!',
              };
              setUserDataState(defaultUserData);
            }
          });

          
          
        } else {
          setLogged(false);
        }
        setLoadingUser(false); // Establecer loadingUser en false
      });
    };
    console.log('meeee caaaa')
    loadInputs().then(inputs => setInputsState(inputs))
    checkLoggedInStatus();
    
  }, []);

  
  const overlayClickHandler = () => {
    setOverlayDisplay(false)
    setDisplaySubMenu(false)
  }


  if (loadingUser) {
    return <div>Loading...</div>; // Mostrar un mensaje de carga mientras se obtienen los datos del usuario
  }

  return (
    <HashRouter >
        { logged ?
          <StyledDiv className="App">
            <UserProvider userDataState={userDataState} setUserDataState={setUserDataState}>
              {window.innerWidth > 768 ? (
                  <LeftSidebar
                    setOverlayDisplay={setOverlayDisplay}
                    displaySubMenu={displaySubMenu}
                    setDisplaySubMenu={setDisplaySubMenu}
                    logged={logged}
                  /> ) : 
                  (
                    <MobilNavBar
                      setOverlayDisplay={setOverlayDisplay}
                      displaySubMenu={displaySubMenu}
                      setDisplaySubMenu={setDisplaySubMenu}
                      logged={logged}
                  /> )
              }
                  <InputsProvider inputsState={inputsState} setInputsState={setInputsState}>
                    <Routes>
                        <Route path="/" element={<Home logged={logged}/>} />
                        {/* <Route path="/profile" element={<Profile />} /> */}
                        <Route path="/:username" element={<Profile />} />
                        <Route path="/:username/followers" element={<Followers />} />
                        <Route path="/:username/following" element={<Following />} />
                        <Route path="/settings" element={<Settings />} />
                    </Routes >
                  </InputsProvider>
          { overlayDisplay && <div onClick={overlayClickHandler} className="full-overlay"></div> }
        </UserProvider>
      </StyledDiv> 
      // if user is not logged, login screen will be displayed
      :<><StyledDiv>
        <InputsProvider inputsState={inputsState} setInputsState={setInputsState}>
              {window.innerWidth > 768 ? (
                <LeftSidebar
                  setOverlayDisplay={setOverlayDisplay}
                  displaySubMenu={displaySubMenu}
                  setDisplaySubMenu={setDisplaySubMenu}
                  logged={logged}
                /> ) : 
                (
                  <MobilNavBar
                    setOverlayDisplay={setOverlayDisplay}
                    displaySubMenu={displaySubMenu}
                    setDisplaySubMenu={setDisplaySubMenu}
                    logged={logged}
                /> )
            }
            <Routes>
              <Route path="/" element={<Home logged={logged}/>} />
            </Routes> 
            </InputsProvider>
          </StyledDiv>
          <Routes>
              <Route path="/login" element={<Login setLogged={setLogged}/>} />
          </Routes> 
          </>
        }
      </HashRouter>
  );
}

export default App;
