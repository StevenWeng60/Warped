import '../../App.css';
import './Messages.css'
import Sidebar from '../../components/sidebar/Sidebar.js';
import Messagebox from './messagebox/Messagebox.js'
import { useState, useEffect } from 'react'
import axios from 'axios'
import firebaseAuth from '../../components/firebaseauth';
import Loading from '../../components/Loading';
import Bottombar from '../../components/bottombar/Bottombar';

function Messages() {
  const [listOfFriendsInfo, setListOfFriendsInfo] = useState([]);
  const [listOfActiveChats, setlistOfActiveChats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getFriends();
  }, []);

  const getRoomName = (username1, username2) => {
    if (username1 > username2){
      return `${username2}${username1}`
    }
    else {
      return`${username1}${username2}`
    }
  }

  const getChatRoom = async (username1, username2) => {
    const room = getRoomName(username1, username2);
    return axios.post("http://localhost:3001/connectChat", {
      chatRoom: room,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
    })
  }

  const getFriends = async () => {
    axios.post("http://localhost:3001/friendicons",{
      username: localStorage.getItem("Username")
    })
    .then(async function (response) {
      const friends = response.data.friends;
      
      const friendsInfo = friends.map((friend) => {
        const dataUrl = friend.avatarURL;
        return {
          username: friend.username,
          id: friend._id,
          imageUrl: dataUrl
        }
      });

      const listOfActiveChats = friendsInfo.filter((friend) => {
        return response.data.chatActive.includes(friend.id)
      })
      const toChatInstances = await Promise.all(listOfActiveChats.map(async (chat) => {
        const chatRoom = await getChatRoom(localStorage.getItem("Username"), chat.username);
        return Object.assign({}, chat, chatRoom);
      }));
      setlistOfActiveChats(toChatInstances);
      setListOfFriendsInfo(friendsInfo);
      setIsLoading(false);
    })
    .catch((error) =>{
      console.error(error);
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
                <Messagebox friends={listOfFriendsInfo} activeChats={listOfActiveChats}/>
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

export default firebaseAuth(Messages);