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

function Profile() {
  const { username, friends } = useParams();
  const [usersPosts, setUsersPosts] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  // will run when rendered
  useEffect(() => {
    getPosts();
  }, [username])

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
      
      console.log(response.data);
      // areFriends represent is a user is friends with the user's profile
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

        const iData = `data:${imageData['contentType']};base64,${Buffer.from(imageData.data, 'binary').toString('base64')}`;
        return {
          id: data._id,
          postid: imageData._id,
          username: data.username,
          description: imageData.description,
          postImage: iData,
          avatarImage: dataUrl,
          numlikes: imageData.usersWhoLiked.length,
          alreadyLikedPost: a ? true : false,
        }
      })

      setUsersPosts(imageObjects);
      setIsLoading(false);
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
              <ProfileBottom posts = {  usersPosts }/>
            </div>
          </div>
          )
      }
      <div className="bottombar">
        <Bottombar/>
      </div>
    </div>
  </div>
  );
}

export default withAuth(Profile);

/*

      {
        isLoading
        ? <Loading/>
        : (<div className="homecontainer">
            <div className="friendicons">
              <FriendIcons friendslist={listOfFriendsInfo}/>
            </div>
            <div className="mainfeed">
              <Main listofposts={posts}/>
            </div>
          </div>)
      }

*/ 