import './App.css';
import Home from './pages/home/Home.js';
import Profile from './pages/profile/Profile.js';
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
