import './FriendIcons.css'
import { people } from '../../../utilities/data.js';
import { useEffect, useState } from 'react'
import { Buffer } from 'buffer'
import axios from 'axios';

function FriendIcons() {
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
          imageUrl: dataUrl
        }
      });
      
      setListOfFriendsInfo(friendsInfo);
    })
    .catch((error) =>{
      console.log(error);
    })
  }
  // const listItems = friends.map(friend =>
  //   <li key={friend.id}>
  //     <img
  //       src={getImageUrl(friend.username)}
  //       alt={friend.username}
  //     />
  //   </li>
  // );
  return (
  <ul className="friendsul">
    {listOfFriendsInfo.map((friend) => {
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
  </ul>
  );
}

export default FriendIcons;