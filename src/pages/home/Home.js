import '../../App.css';
import './Home.css';
import Sidebar from '../../components/sidebar/Sidebar.js';
import FriendIcons from './friendicons/FriendIcons.js';
import Main from './mainfeed/Main.js';
import firebaseAuth from '../../components/firebaseauth';
import Loading from '../../components/Loading.js';
import { useState, useEffect } from 'react'
import axios from 'axios'
import Bottombar from '../../components/bottombar/Bottombar';

function Home() {
  const [isLoading, setIsLoading] = useState(true);

  // props for main screen
  const [posts, setPosts] = useState([]);

  
  // props for friend icons
  const [listOfFriendsInfo, setListOfFriendsInfo] = useState([]);

  const [listOfFriendsUsername, setListOfFriendsUsername] = useState([]);

  useEffect(() => {
    // get friends
    const friends = axios.post("http://localhost:3001/friendicons",{
      username: localStorage.getItem("Username")
    });
    // get feed
    const mainfeed = axios.get("http://localhost:3001/mainfeed",
    {
      params: {
        username: localStorage.getItem("Username"),
      }
    }
    )

    Promise.all([friends, mainfeed])
    .then(([res1, res2]) => {
      // Logic for friends
      console.log(res1.data.friends);
      const friends = res1.data.friends;
      
      const friendsInfo = friends.map((friend) => {
        const dataUrl = friend.avatarURL;
        return {
          username: friend.username,
          imageUrl: dataUrl
        }
      });
      
      setListOfFriendsInfo(friendsInfo);

      const friendsUsernames = friends.map(friend => {
        return friend.username
      })

      console.log(`friends usernames: ${friendsUsernames}`)
      setListOfFriendsUsername(friendsUsernames);

      // Logic for feed
      const postObjects = res2.data.map((post) => {
        const postUrl = post.url;

        const avatarUrl = post.user.avatarURL;

        const a = post.usersWhoLiked.find((user) => {
          return user === localStorage.getItem("Id")
        })

        return {
          id: post.user._id,
          postid: post._id,
          username: post.user.username,
          description: post.description,
          postImage: postUrl,
          avatarImage: avatarUrl,
          numlikes: post.usersWhoLiked.length,
          alreadyLikedPost: a ? true : false,
        }
      })

      setPosts(postObjects);

      // Logic that belongs to neither
      setIsLoading(false);
      console.log('asdf')
    })
    .catch((error) => {
      console.error(error);
    })
  }, [])
  
  return (
  <div className="App">
    <div className="Body">
      <div className="sidebar">
        <Sidebar currActive="Home"/>
      </div>
      {
        isLoading
        ? <Loading/>
        : (<div className="homecontainer">
            <div className="friendicons">
              <FriendIcons friendslist={listOfFriendsInfo}/>
            </div>
            <div className="mainfeed">
              <Main listofposts={posts} listOfFriends={listOfFriendsUsername}/>
            </div>
          </div>)
      }
      <div className="bottombar">
        <Bottombar currActive="Home"/>
      </div>
    </div>
  </div>
  );
}

export default firebaseAuth(Home);
