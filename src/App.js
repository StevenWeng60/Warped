import './App.css';
import Home from './Home.js';
import Profile from './Profile.js';
import { Route, Routes } from "react-router-dom"

function App() {
  return (
    <>
      <Routes>
        <Route path="" element={<Home />}/>
        <Route path="/profile" element={<Profile />}/>
      </Routes>
    </>
  );
}

export default App;
