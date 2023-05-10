import React from 'react';
import { HashRouter , Routes, Route } from "react-router-dom";
import Home from './Components/Pages/Home';
import Profile from './Components/Pages/Profile';
import Settings from './Components/Pages/Settings';



function App() {
  return (
    <HashRouter>
      <div className="App">
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
        </Routes >
      </div>
    </HashRouter>
  );
}

export default App;
