import './FriendIcons.css'
import { people } from '../../../utilities/data.js';
import { getImageUrl } from '../../../utilities/utils.js';
import axios from 'axios';

function FriendIcons() {
  let friends = []
  function getFriends() {
    axios.post("http://localhost:3001/friendicons",{
      username: localStorage.getItem("Username")
    })
    .then(function (response) {
      console.log(response);
      friends = response.data.friends;
      console.log(friends);
    })
    .catch((error) =>{
      console.log(error);
    })
  }
  getFriends();
  const listItems = friends.map(friend =>
    <li key={friend.id}>
      <img
        src={getImageUrl(friend.username)}
        alt={friend.username}
      />
    </li>
  );
  return <ul className="friendsul">{listItems}</ul>;
}

export default FriendIcons;