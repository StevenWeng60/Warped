import "./Sidebar.css"
import {React, useRef} from 'react';
import { FaHome, FaUserCircle, FaMailBulk, FaRegPlusSquare, FaToriiGate } from "react-icons/fa";
import { Link, Route, Routes } from "react-router-dom"
import axios from 'axios';

function Sidebar() {
  const inputFileRef = useRef(null);

  const addAvatar = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('avatar', inputFileRef.current.files[0], inputFileRef.current.files[0].name);
    // formData.append('buffer', inputFileRef.current.files[0]);
    formData.append('originalname', inputFileRef.current.files[0].name);
    // "http://localhost:3001/upload/avatar"
    axios.post("http://localhost:3001/upload/post",formData,{
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }).then(function (response){
      console.log(response);
    }).catch(function (error){
      console.log(error);
    })
    console.log("complete1");
  };

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
            <FaToriiGate style={{fontSize: '2em'}}/>
            <h2 className="lih2">  Warp</h2>
          </div>
        </li>
        <li>
          <h1>{localStorage.getItem("Username")}</h1>
        </li>
        <li>
          <form encType="multipart/form-data" method="post" onSubmit= {addAvatar}>
            <div className="form-group">
              <input type="file" className="form-control-file" name="uploaded_file" ref={inputFileRef}/>
              <input type="submit" value="submit"/>
            </div>
          </form>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;