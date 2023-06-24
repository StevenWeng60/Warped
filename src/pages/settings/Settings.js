import "./Settings.css"
import Sidebar from "../../components/sidebar/Sidebar";
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Bottombar from "../../components/bottombar/Bottombar";
import firebaseAuth from "../../components/firebaseauth";
import { signOut } from 'firebase/auth'
import { auth } from "../../config/firebase-config";
import prodConfig from "../../config/production-config";


function Settings() {
  const [bioText, setBioText] = useState('');
  const navigate = useNavigate();
  const [seeSuccess, setSeeSuccess] = useState(false);

  function handleTextChange(e) {
    setBioText(e.target.value);
  }

  function handleSaveClick() {
    axios.post(`${prodConfig}/changebio`, {
        username: localStorage.getItem("Username"),
        biodescription: bioText,
      },
    )
    .then((response) => {
    })
    .catch((error) => {  
      console.error(error);
    })
    setBioText('');
    setSeeSuccess(true);
    showSuccess();
  }

  function showSuccess() {
    setTimeout(() => {
      setSeeSuccess(false);
    }, 3000)
  }

  const handleLogOut = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    }
    catch (err) {
      console.error(err);
    }
  }

  return (
  <div className="App">
    <div className="Body">
      <div className="sidebar">
        <Sidebar currActive="Settings"/>
      </div>
      <div className="mainsettings">
        <div className="maineditfeed">
          <h1>Settings</h1>
          <h4>Bio</h4>
          <textarea rows="8" cols="25" type="textarea" id="biodescription" value={bioText} onChange={handleTextChange} style={{width: '100%'}}></textarea>
          <button type='submit' style={{borderRadius: '5px', width: '100%'}} onClick={handleSaveClick}>Save</button>
          {seeSuccess && <h1 className="successPopUp">Success!</h1>}
          <button type='submit' style={{marginTop: '5em', color: 'black', background: 'red', borderRadius: '5px', width: '50%', textAlign: 'center'}} onClick={handleLogOut}>Log Out</button>
        </div>
      </div>
      <div className="bottombar">
        <Bottombar currActive="Settings"/>
      </div>
    </div>
  </div>
  );
}

export default firebaseAuth(Settings);
