import React, { useState } from 'react';
// I changed HashRouter for BrowserRouter just because testing in the address bar.
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Components/Pages/Home';
import Profile from './Components/Pages/Profile';
import Settings from './Components/Pages/Settings';
import LeftSidebar from './Components/Generic/LeftSidebar';
import { styled } from 'styled-components';
import Followers from './Components/Pages/Follows/Followers';
import Following from './Components/Pages/Follows/Following';


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

function App() {

  const [overlayDisplay, setOverlayDisplay] = useState(false)
  const [displaySubMenu, setDisplaySubMenu] = useState(false)

  const overlayClickHandler = () => {
    setOverlayDisplay(false)
    setDisplaySubMenu(false)
  }

  return (
    <BrowserRouter >
      <StyledDiv className="App">
        <LeftSidebar 
          setOverlayDisplay={setOverlayDisplay} 
          displaySubMenu={displaySubMenu}
          setDisplaySubMenu={setDisplaySubMenu}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/following" element={<Followers />} />
          <Route path="/profile/followers" element={<Following />} />
          <Route path="/settings" element={<Settings />} />
        </Routes >
        { overlayDisplay && <div onClick={overlayClickHandler} className="full-overlay"></div> }
      </StyledDiv>
    </BrowserRouter>
  );
}

export default App;
