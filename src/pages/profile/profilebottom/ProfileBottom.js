import './ProfileBottom.css'
import { people } from '../../../utilities/data.js'
import { getImageUrl } from '../../../utilities/utils.js'
import { useEffect, useState } from 'react'
import { Buffer } from 'buffer'
import axios from 'axios'

function ProfileBottom({ posts }) {
  const [usersPosts, setUsersPosts] = useState([]);
  // let posts = []

  //   function getPosts() {
  //   axios.post("http://localhost:3001/friendicons",{
  //     username: localStorage.getItem("Username")
  //   })
  //   .then(function (response) {
  //     console.log(response);
  //     friends = response.data.friends;
  //     console.log(friends);
  //   })
  //   .catch((error) =>{
  //     console.log(error);
  //   })
  // }
  // getPosts();
  return (
  <div className="postflexcontainer">
    { posts }
  </div>
  );
}

export default ProfileBottom;