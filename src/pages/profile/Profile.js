import '../../App.css';
import './Profile.css';
import Sidebar from '../../components/sidebar/Sidebar.js';
import ProfileTop from './profiletop/ProfileTop.js';
import ProfileBottom from './profilebottom/ProfileBottom.js';
import { Buffer } from 'buffer'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

function Profile() {
  const { username } = useParams();

  const [usersPosts, setUsersPosts] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  // will run win rendered
  useEffect(() => {
    getPosts();
  }, [])

  // One get request that grabs all of a users information and their posts history
  const getPosts = async () => {
    axios.get("http://localhost:3001/usersposts", 
    {
      params: {
        username: username
      },
    })
    .then(function (response) {
      const data = response.data;
      const arrayOfPosts = data.posts;
      console.log(data);

      // Create object for profileTop component
      const dataUrl = `data:${data['avatarContentType']};base64,${Buffer.from(data.avatar, 'binary').toString('base64')}`;
      console.log(dataUrl);

      setUserInfo({
        username: data.username,
        numFriends: data.numFriends,
        numPosts: arrayOfPosts.length,
        avatarData: dataUrl,
        profileDescription: data.profileDescription,
      })

      const imageObjects = arrayOfPosts.map((imageData) => {
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

  return (
  <div className="App">
    <div className="Body">
      <div className="sidebar">
        <Sidebar/>
      </div>
      <div className="topofprofile">
        <ProfileTop userInfo = {userInfo}/>
      </div>
      <div className="bottomofprofile">
        <ProfileBottom posts = {  usersPosts.map((post) => {
          return (
          <div className="post" key={post._id}>
            <img src={post.imageUrl}></img>
          </div>
          );
        })}/>
      </div>
    </div>
  </div>
  );
}

export default Profile;