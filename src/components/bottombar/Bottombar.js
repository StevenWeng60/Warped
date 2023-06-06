import {React, useRef, useState, useEffect} from 'react';
import { FaHome, FaUserCircle, FaMailBulk, FaRegPlusSquare, FaToriiGate, FaSearch, FaCog } from "react-icons/fa";
import { Link, Route, Routes, useNavigate } from "react-router-dom"
import './Bottombar.css'


function Bottombar({currActive}) {
  // Get viewport width
  const profileRoute = '/profile/' + localStorage.getItem("Username") + "/me";

// appears when width is less than 550px

  return (
      <div className="Bottombar">
        <ul className="bottombarOptions">
          <li>
              <Link to={profileRoute} className={currActive === "Profile" ? "activelink" : "link"}>
                <div className={currActive === "Profile" ? "sideIconActive" : "sideIcon"}>
                  <FaUserCircle className="iconStyles"/>
                </div>
              </Link>
          </li>
          <li>
            <Link to="/" className={currActive === "Home"? "activelink" : "link"}>
              <div className={currActive === "Home" ? "sideIconActive" : "sideIcon"}>
                <FaHome className="iconStyles"/>
              </div>
            </Link>
          </li>
          <li>
            <Link to="/messages" className={currActive === "Message"? "activelink" : "link"}>          
              <div className={currActive === "Message" ? "sideIconActive" : "sideIcon"}>
                <FaMailBulk className="iconStyles"/>
              </div>
            </Link>
          </li>
          <li>
            <Link to="/post" className={currActive === "Post"? "activelink" : "link"}>
              <div className={currActive === "Post" ? "sideIconActive" : "sideIcon"}>
                  <FaRegPlusSquare className="iconStyles"/>
              </div>
            </Link>
          </li>
          <li>
            <Link to="/search" className={currActive === "Search"? "activelink" : "link"}>
              <div className={currActive === "Search" ? "sideIconActive" : "sideIcon"}>
                  <FaSearch className="iconStyles"/>
              </div>
            </Link>
          </li>
          <li>
            <Link to="/settings" className={currActive === "Settings"? "activelink" : "link"}>
              <div className={currActive === "Settings" ? "sideIconActive" : "sideIcon"}>
                <FaCog className="iconStyles"/>
              </div>
            </Link>
          </li>
        </ul>
      </div>
  );
}

export default Bottombar;