import './FriendIcons.css'
import { people } from '../../../utilities/data.js';
import { useEffect, useState } from 'react'
import { Buffer } from 'buffer'
import axios from 'axios';

function FriendIcons() {
  const [listOfFriendsInfo, setListOfFriendsInfo] = useState([]);
  const [listStart, setListStart] = useState(0);
  const [listEnd, setListEnd] = useState(12);


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
          imageUrl: dataUrl
        }
      });
      
      setListOfFriendsInfo(friendsInfo);
    })
    .catch((error) =>{
      console.log(error);
    })
  }

  // There is no empty space, always have friend icons full
  const handleRightClick = () => {
    const numFriends = listOfFriendsInfo.length;
    let newListEnd = listEnd + 2;
    let newListStart = listStart + 2;
    
    // If adding 4 to the listEnd is greater than the num of friends
    // set new ListEnd to numFriends
    // set 
    if(newListEnd > numFriends){
      newListEnd = numFriends;
      newListStart = newListEnd - 12;
    }

    // set the hooks to the new proper values
    setListEnd(newListEnd);
    setListStart(newListStart);

  }
  // There is no empty space, always have friend icons full
  const handleLeftClick = () => {
    let newListEnd = listEnd - 2;
    let newListStart = listStart - 2;
    
    // If subtracting 4 to the listStart is less than 0
    // set new list start to 0
    if(newListStart < 0){
      newListStart = 0;
      newListEnd = 12;
    }

    // set the hooks to the new proper values
    setListEnd(newListEnd);
    setListStart(newListStart);
  }

  return (
  <ul className="friendsul">
    {listOfFriendsInfo.map((friend) => {
      // if (index >= listStart && index < listEnd){
      //   return (
      //     <li key={friend._id}>
      //       <img 
      //         src={friend.imageUrl}
      //         alt={friend.username}
      //       />
      //       <p>{friend.username}</p>
      //     </li>
      //   )
      // }

      return (
        <li key={friend._id}>
          <img 
            src={friend.imageUrl}
            alt={friend.username}
          />
          <p>{friend.username}</p>
        </li>
      )
    })}
    <button className="right" style={{visibility: 'hidden'}} onClick={handleRightClick}> Right </button>
    <button className="left" style={{visibility: 'hidden'}} onClick={handleLeftClick}>Left </button>
  </ul>
  );
}

export default FriendIcons;