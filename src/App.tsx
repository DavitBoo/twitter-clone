import React from 'react';
// I changed HashRouter for BrowserRouter just because testing in the address bar.
import { BrowserRouter  , Routes, Route } from "react-router-dom";
import Home from './Components/Pages/Home';
import Profile from './Components/Pages/Profile';
import Settings from './Components/Pages/Settings';
import LeftSidebar from './Components/Generic/LeftSidebar';
import { styled } from 'styled-components';

const StyledDiv = styled.div `
  display: flex;
  gap: .7rem;
  
  > div:nth-child(2){
    flex: 1 1 50%;
  }
  
`;

function App() {
  return (
    <BrowserRouter >
      <StyledDiv className="App">
        <LeftSidebar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
        </Routes >
      </StyledDiv>
    </BrowserRouter>
  );
}

export default App;
