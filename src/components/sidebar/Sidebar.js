import "./Sidebar.css"
import {React, useRef, useState, useEffect} from 'react';
import { FaHome, FaUserCircle, FaMailBulk, FaRegPlusSquare, FaToriiGate, FaSearch } from "react-icons/fa";
import { Link, Route, Routes, useNavigate } from "react-router-dom"
import axios from 'axios';
import IconSidebar from "./iconsidebar/IconSidebar";

function Sidebar() {
  // Get viewport width
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
  const navigate = useNavigate();
  useEffect(() => {
    function handleResize() {
      setViewportWidth(window.innerWidth)
    }
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])
  const profileRoute = '/profile/' + localStorage.getItem("Username") + "/me";

  const handleLogOut = () => {
    localStorage.removeItem('accessToken');
    navigate("/login");
  }

  return (
    <div>
      {viewportWidth > 768
      ? <div className="Sidebar">
        <div className="websiteTitle">
          <h1>Warped</h1>
        </div>
        <ul className="sidebarOptions">
          <li>
              <div className="sideIcon">
                <Link to={profileRoute} className="link">
                <FaHome className="iconStyles"/>
                <h4 className="lih2">Profile</h4>
                </Link>
              </div>
          </li>
          <li>
              <div className="sideIcon">
                <Link to="/" className="link">
                <FaUserCircle className="iconStyles"/>
                <h4 className="lih2">Home</h4>
                </Link>
              </div>
          </li>
          <li>
              <div className="sideIcon">
                <Link to="/messages" className="link">          
                <FaMailBulk className="iconStyles"/>
                <h4 className="lih2">Message</h4>
                </Link>
              </div>
          </li>
          <li>
            <div className="sideIcon">
              <Link to="/post" className="link">
                <FaRegPlusSquare className="iconStyles"/>
                <h4 className="lih2">Post</h4>
              </Link>
            </div>
          </li>
          <li>
            <div className="sideIcon">
              <Link to="/search" className="link">
                <FaSearch className="iconStyles"/>
                <h4 className="lih2">Search</h4>
              </Link>
            </div>
          </li>
          <li>
            <div className="sideIcon">
              <Link to="/search" className="link">
              <FaToriiGate className="iconStyles"/>
              <h4 className="lih2">Warp</h4>
              </Link>
            </div>
          </li>
          <li className="logoutbtn">
            <h4>{localStorage.getItem("Username")}</h4>
            <h4 onClick={handleLogOut}>Log out</h4>
          </li>
        </ul>
      </div>
      :
      <IconSidebar/>
      }
    </div>
  );
}

export default Sidebar;