import './App.css';
import Home from './pages/home/Home.js';
import Profile from './pages/profile/Profile.js';
import Messages from './pages/messages/Messages.js';
import { Route, Routes } from "react-router-dom"

function App() {
  return (
    <>
      <Routes>
        <Route path="" element={<Home />}/>
        <Route path="/profile" element={<Profile />}/>
        <Route path="/messages" element={<Messages />}/>
      </Routes>
    </>
  );
}

export default App;
