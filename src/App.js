import './App.css';
import Home from './pages/home/Home.js';
import Profile from './pages/profile/Profile.js';
import Messages from './pages/messages/Messages.js';
import Login from './pages/login/Login.js';
import CreateAcc from './pages/login/CreateAcc.js';
import Test from './Test.js';
import { Route, Routes } from "react-router-dom"

function App() {
  return (
    <>
      <Routes>
        <Route path="" element={<Home />}/>
        <Route path="/" element={<Home />}/>
        <Route path="/profile" element={<Profile />}/>
        <Route path="/messages" element={<Messages />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/create" element={<CreateAcc />}/>
        <Route path="/test" element={<Test/>}/>
      </Routes>
    </>
  );
}

export default App;
