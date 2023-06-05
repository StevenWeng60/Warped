import "./Settings.css"
import withAuth from "../../components/authenticate";
import Sidebar from "../../components/sidebar/Sidebar";
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


function Settings() {
  const [bioText, setBioText] = useState('');
  const navigate = useNavigate();

  function handleTextChange(e) {
    setBioText(e.target.value);
  }

  function handleSaveClick() {
    axios.post("http://localhost:3001/changebio", {
        username: localStorage.getItem("Username"),
        biodescription: bioText,
      },
    )
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {  
      console.error(error);
    })
  }

  const handleLogOut = () => {
    localStorage.removeItem('accessToken');
    navigate("/login");
  }

  return (
  <div className="App">
    <div className="Body">
      <div className="sidebar">
        <Sidebar/>
      </div>
      <div className="mainsettings">
        <div className="maineditfeed">
          <h1>Settings</h1>
          <h4>Bio</h4>
          <textarea rows="8" cols="25" type="textarea" id="biodescription" value={bioText} onChange={handleTextChange} style={{width: '100%'}}></textarea>
          <button type='submit' style={{borderRadius: '5px', width: '100%'}} onClick={handleSaveClick}>Save</button>
          <button type='submit' style={{position:'absolute', bottom: '2em',left: '25%', color: 'black', background: 'red', borderRadius: '5px', width: '50%', textAlign: 'center'}} onClick={handleLogOut}>Log Out</button>
        </div>
      </div>
    </div>
  </div>
  );
}

export default withAuth(Settings);
