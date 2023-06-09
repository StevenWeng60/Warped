import "../Sidebar.css"
import "./IconSidebar.css"
import {React, useRef} from 'react';
import { FaHome, FaUserCircle, FaMailBulk, FaRegPlusSquare, FaToriiGate, FaSearch, FaDoorOpen, FaCog } from "react-icons/fa";
import { Link, Route, Routes } from "react-router-dom"
import axios from 'axios';

function IconSidebar({ currActive }) {
  const profileRoute = '/profile/' + localStorage.getItem("Username") + "/me";

  return (
    <div className="Sidebar">
      <div className="websiteTitle">
        <h1>W</h1>
      </div>
      <ul className="sidebarOptions">
          <li>
            <Link to={profileRoute} className={currActive === "Profile" ? "activelink" : "link"}>
              <div className="sideIcon">
                <FaUserCircle className="iconStyles"/>
              </div>
            </Link>
          </li>
        <li>
          <Link to="/" className={currActive === "Home" ? "activelink" : "link"}>
            <div className="sideIcon">
              <FaHome className="iconStyles"/>
            </div>
          </Link>
        </li>
        <li>
          <Link to="/messages" className={currActive === "Message" ? "activelink" : "link"}>          
            <div className="sideIcon">
              <FaMailBulk className="iconStyles"/>
            </div>
          </Link>
        </li>
        <li>
          <Link to="/post" className={currActive === "Post" ? "activelink" : "link"}>
            <div className="sideIcon">
              <FaRegPlusSquare className="iconStyles"/>
            </div>
          </Link>
        </li>
        <li>
          <Link to="/search" className={currActive === "Search" ? "activelink" : "link"}>
            <div className="sideIcon">
                <FaSearch className="iconStyles"/>
            </div>
          </Link>
        </li>
        <li>
          <Link to="/settings" className={currActive === "Settings"? "activelink" : "link"}>
            <div className="sideIcon">
                <FaCog className="iconStyles"/>
            </div>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default IconSidebar;