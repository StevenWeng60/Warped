import "./Sidebar.css"
import React from 'react';
import { FaHome, FaUserCircle, FaMailBulk, FaRegPlusSquare, FaToriiGate } from "react-icons/fa";

function Sidebar() {
  return (
    <div className="Sidebar">
      <div className="websiteTitle">
        <h1>Warped</h1>
      </div>
      <ul className="sidebarOptions">
        <li>
          <div>
            <FaHome style={{fontSize: '2em'}}/>
            <h2 className="lih2">  Profile</h2>
          </div>
        </li>
        <li>
          <div>
            <FaUserCircle style={{fontSize: '2em'}}/>
            <h2 className="lih2">  Home</h2>
          </div>
        </li>
        <li>
          <div>
            <FaMailBulk style={{fontSize: '2em'}}/>
            <h2 className="lih2">  Messages</h2>
          </div>
        </li>
        <li>
          <div>
            <FaRegPlusSquare style={{fontSize: '2em'}}/>
            <h2 className="lih2">  Post</h2>
          </div>
        </li>
        <li>
          <div>
            <FaToriiGate style={{fontSize: '2em'}}/>
            <h2 className="lih2">  Warp</h2>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;