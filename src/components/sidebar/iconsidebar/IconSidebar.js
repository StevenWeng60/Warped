import "../Sidebar.css"
import "./IconSidebar.css"
import {React, useRef} from 'react';
import { FaHome, FaUserCircle, FaMailBulk, FaRegPlusSquare, FaToriiGate, FaSearch, FaDoorOpen } from "react-icons/fa";
import { Link, Route, Routes } from "react-router-dom"
import axios from 'axios';

function IconSidebar() {
  const profileRoute = '/profile/' + localStorage.getItem("Username") + "/me";

  return (
    <div className="Sidebar">
      <div className="websiteTitle">
        <h1>W</h1>
      </div>
      <ul className="sidebarOptions">
          <li>
            <div className="sideIcon">
              <Link to={profileRoute} className="link">
              <FaHome className="iconStyles"/>
              </Link>
            </div>
          </li>
        <li>
            <div className="sideIcon">
              <Link to="/" className="link">
              <FaUserCircle className="iconStyles"/>
              </Link>
            </div>
        </li>
        <li>
            <div className="sideIcon">
              <Link to="/messages" className="link">          
              <FaMailBulk className="iconStyles"/>
              </Link>
            </div>
        </li>
        <li>
          <div className="sideIcon">
            <Link to="/post" className="link">
              <FaRegPlusSquare className="iconStyles"/>
            </Link>
          </div>
        </li>
        <li>
          <div className="sideIcon">
            <Link to="/search" className="link">
              <FaSearch className="iconStyles"/>
            </Link>
          </div>
        </li>
        <li>
          <div className="sideIcon">
            <Link to="/search" className="link">
              <FaToriiGate className="iconStyles"/>
            </Link>
          </div>
        </li>
        <li className="sideIcon">
          <div className="sideIcon">
            <Link to="" className="link">
              <FaDoorOpen className="iconStyles"/>
            </Link>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default IconSidebar;