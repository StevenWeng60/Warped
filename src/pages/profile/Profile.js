import '../../App.css';
import './Profile.css';
import Sidebar from '../../components/sidebar/Sidebar.js';
import ProfileTop from './profiletop/ProfileTop.js';
import ProfileBottom from './profilebottom/ProfileBottom.js';
import { Buffer } from 'buffer'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import withAuth from '../../components/authenticate';
import Loading from '../../components/Loading';
import Bottombar from '../../components/bottombar/Bottombar';
import firebaseAuth from '../../components/firebaseauth';
import prodConfig from '../../config/production-config';

function Profile() {
  const { username, friends } = useParams();
  const [usersPosts, setUsersPosts] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  // will run when rendered or when the username dependency changes
  useEffect(() => {
    getPosts();
  }, [username])

  // One get request that grabs all of a users information and their posts history
  const getPosts = async () => {
    axios.get(`${prodConfig}/usersposts`, 
    {
      params: {
        username: username
      },
    })
    .then(function (response) {
      const data = response.data;
      const arrayOfPosts = data.posts;

      // Create object for profileTop component picture
      const dataUrl = data.avatarURL;
      
      // areFriends represent if a user is friends with the user's profile
      // this field is useless if its the same user since it won't be used
      setUserInfo({
        username: data.username,
        numFriends: data.numFriends,
        numPosts: arrayOfPosts.length,
        avatarData: dataUrl,
        profileDescription: data.profileDescription,
        areFriends: friends,
      })

      const imageObjects = arrayOfPosts.map((imageData) => {
        const a = imageData.usersWhoLiked.find((user) => {
          return user === localStorage.getItem("Id")
        })

        const iDataURL = imageData.url;
        return {
          id: data._id,
          postid: imageData._id,
          username: data.username,
          description: imageData.description,
          postImage: iDataURL,
          avatarImage: dataUrl,
          numlikes: imageData.usersWhoLiked.length,
          alreadyLikedPost: a ? true : false,
        }
      })

      setUsersPosts(imageObjects);
      setIsLoading(false);
    })
    .catch(function (error){
      console.log(error);
    })
  }

  return (
  <div className="App">
    <div className="Body">
      <div className="sidebar">
        <Sidebar currActive="Profile"/>
      </div>
      {
        isLoading
        ? <Loading/>
        : (<div className="homecontainer">
            <div className="topofprofile">
              <ProfileTop userInfo = {userInfo}/>
            </div>
            <div className="bottomofprofile">
              <ProfileBottom posts = {usersPosts} userInfo = {userInfo} friendList="!@@#%#Q$@#"/>
            </div>
          </div>
          )
      }
      <div className="bottombar">
        <Bottombar currActive="Profile"/>
      </div>
    </div>
  </div>
  );
}

export default firebaseAuth(Profile);
