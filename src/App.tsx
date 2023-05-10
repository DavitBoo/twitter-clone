import React from 'react';
// I changed Hashrouter for BrowserRouter just because testing in the address bar.
import { BrowserRouter  , Routes, Route } from "react-router-dom";
import Home from './Components/Pages/Home';
import Profile from './Components/Pages/Profile';
import Settings from './Components/Pages/Settings';



function App() {
  return (
    <BrowserRouter >
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
        </Routes >
      </div>
    </BrowserRouter>
  );
}

export default App;
