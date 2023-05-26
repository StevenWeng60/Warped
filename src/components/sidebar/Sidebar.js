import "./Sidebar.css"
import {React, useRef} from 'react';
import { FaHome, FaUserCircle, FaMailBulk, FaRegPlusSquare, FaToriiGate, FaSearch } from "react-icons/fa";
import { Link, Route, Routes } from "react-router-dom"
import axios from 'axios';

function Sidebar() {

  return (
    <div className="Sidebar">
      <div className="websiteTitle">
        <h1>Warped</h1>
      </div>
      <ul className="sidebarOptions">
        <li>
          <Link to="/profile" className="link">
            <div>
              <FaHome style={{fontSize: '2em'}}/>
              <h2 className="lih2">  Profile</h2>
            </div>
          </Link>
        </li>
        <li>
          <Link to="/" className="link">
            <div>
              <FaUserCircle style={{fontSize: '2em'}}/>
              <h2 className="lih2">  Home</h2>
            </div>
          </Link>
        </li>
        <li>
          <Link to="/messages" className="link">          
            <div>
              <FaMailBulk style={{fontSize: '2em'}}/>
              <h2 className="lih2">  Messages</h2>
            </div>
          </Link>
        </li>
        <li>
          <div>
            <Link to="/post" className="link">
              <FaRegPlusSquare style={{fontSize: '2em'}}/>
              <h2 className="lih2">  Post</h2>
            </Link>
          </div>
        </li>
        <li>
          <div>
            <Link to="/search" className="link">
              <FaSearch style={{fontSize: '2em'}}/>
              <h2 className="lih2">  Search</h2>
            </Link>
          </div>
        </li>
        <li>
          <div>
            <FaToriiGate style={{fontSize: '2em'}}/>
            <h2 className="lih2">  Warp</h2>
          </div>
        </li>
        <li>
          <h2>{localStorage.getItem("Username")}</h2>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;