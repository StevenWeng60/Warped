import '../../App.css';
import './Messages.css'
import Sidebar from '../../components/sidebar/Sidebar.js';
import Messagebox from './messagebox/Messagebox.js'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Buffer } from 'buffer'
import withAuth from '../../components/authenticate';

function Messages() {
  const [listOfFriendsInfo, setListOfFriendsInfo] = useState([]);

  useEffect(() => {
    getFriends();
  }, []);

  function getFriends() {
    axios.post("http://localhost:3001/friendicons",{
      username: localStorage.getItem("Username")
    })
    .then(function (response) {
      console.log(response.data.friends);
      const friends = response.data.friends;
      
      const friendsInfo = friends.map((friend) => {
        const dataUrl = `data:${friend['avatarContentType']};base64,${Buffer.from(friend.avatar, 'binary').toString('base64')}`;
        return {
          username: friend.username,
          id: friend._id,
          imageUrl: dataUrl
        }
      });
      
      setListOfFriendsInfo(friendsInfo);
    })
    .catch((error) =>{
      console.log(error);
    })
  }


  return (
  <div className="App">
    <div className="Body">
      <div className="sidebar">
        <Sidebar/>
      </div>
      <div className="messagesbox">
        <Messagebox friends={listOfFriendsInfo}/>
      </div>
    </div>
  </div>
  );
}

export default withAuth(Messages);