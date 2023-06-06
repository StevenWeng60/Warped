import '../../App.css';
import './Home.css';
import Sidebar from '../../components/sidebar/Sidebar.js';
import FriendIcons from './friendicons/FriendIcons.js';
import Main from './mainfeed/Main.js';
import withAuth from '../../components/authenticate';
import Loading from '../../components/Loading.js';
import { useState, useEffect } from 'react'
import { Buffer } from 'buffer'
import axios from 'axios'

function Home() {
  const [isLoading, setIsLoading] = useState(true);

  // props for main screen
  const [posts, setPosts] = useState([]);

  
  // props for friend icons
  const [listOfFriendsInfo, setListOfFriendsInfo] = useState([]);

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
        const dataUrl = `data:${friend['avatarContentType']};base64,${Buffer.from(friend.avatar, 'binary').toString('base64')}`;
        return {
          username: friend.username,
          imageUrl: dataUrl
        }
      });
      
      setListOfFriendsInfo(friendsInfo);

      // Logic for feed
      const postObjects = res2.data.map((post) => {
        const postUrl = `data:${post['contentType']};base64,${Buffer.from(post.data, 'binary').toString('base64')}`;

        const avatarUrl = `data:${post.user['avatarContentType']};base64,${Buffer.from(post.user.avatar, 'binary').toString('base64')}`;

        return {
          id: post.user._id,
          username: post.user.username,
          description: post.description,
          postImage: postUrl,
          avatarImage: avatarUrl,
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

  const getMainFeed = async () => {
    axios.get("http://localhost:3001/mainfeed",
    {
      params: {
        username: localStorage.getItem("Username"),
      }
    }
    )
    .then((response) => {
      console.log(response);

      const postObjects = response.data.map((post) => {
        const postUrl = `data:${post['contentType']};base64,${Buffer.from(post.data, 'binary').toString('base64')}`;

        const avatarUrl = `data:${post.user['avatarContentType']};base64,${Buffer.from(post.user.avatar, 'binary').toString('base64')}`;

        return {
          id: post.user._id,
          username: post.user.username,
          description: post.description,
          postImage: postUrl,
          avatarImage: avatarUrl,
        }
      })

      setPosts(postObjects);

      console.log("route works");
    })
    .catch((error) => {
      console.log(error);
    })
  }
  
  return (
  <div className="App">
    <div className="Body">
      <div className="sidebar">
        <Sidebar/>
      </div>
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
    </div>
  </div>
  );
}

export default withAuth(Home);
