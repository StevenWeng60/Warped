import '../../App.css';
import './Messages.css'
import Sidebar from '../../components/sidebar/Sidebar.js';
import Messagebox from './messagebox/Messagebox.js'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Buffer } from 'buffer'
import withAuth from '../../components/authenticate';
import Loading from '../../components/Loading';
import Bottombar from '../../components/bottombar/Bottombar';

function Messages() {
  const [listOfFriendsInfo, setListOfFriendsInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
      setIsLoading(false);
    })
    .catch((error) =>{
      console.log(error);
    })
  }


  return (
  <div className="App">
    <div className="Body">
      <div className="sidebar">
        <Sidebar currActive="Message"/>
      </div>
      {
        isLoading
        ? <Loading/>
        : (
            <div className="messageboxcontainer">
              <div className="messagesbox">
                <Messagebox friends={listOfFriendsInfo}/>
              </div>
            </div>
          )
      }
      <div className="bottombar">
        <Bottombar currActive="Message"/>
      </div>
    </div>
  </div>
  );
}

export default withAuth(Messages);