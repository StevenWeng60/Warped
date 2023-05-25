import './ProfileBottom.css'
import { people } from '../../../utilities/data.js'
import { getImageUrl } from '../../../utilities/utils.js'
import { useEffect, useState } from 'react'
import { Buffer } from 'buffer'
import axios from 'axios'

function ProfileBottom() {
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


  useEffect(() => {
    getPosts();
  }, [])

  const getPosts = async () => {
    axios.get("http://localhost:3001/usersposts", 
    {
      params: {
        username: localStorage.getItem("Username")
      },
    })
    .then(function (response) {
      const data = response.data;
      console.log(data);

      const imageObjects = data.map((imageData) => {
        const dataUrl = `data:${imageData['contentType']};base64,${Buffer.from(imageData.data, 'binary').toString('base64')}`;
        return {
          description: imageData.description,
          imageUrl: dataUrl
        }
      })

      setUsersPosts(imageObjects);

      console.log(imageObjects);
    })
    .catch(function (error){
      console.log(error);
    })
  }

  const chemists = people.filter(person =>
    person.profession === 'chemist'
  );

  const posts = usersPosts.map((post) => {
    return (
    <div className="post">
      <img src={post.imageUrl}></img>
    </div>
    );
  })



  return (
  <div className="postflexcontainer">
    {posts}
  </div>
  );
}

export default ProfileBottom;