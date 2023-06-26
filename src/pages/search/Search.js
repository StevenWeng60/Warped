import './Search.css'
import Sidebar from '../../components/sidebar/Sidebar.js';
import Searchresults from './searchresults/Searchresults.js';
import { useRef, useState, useLayoutEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import Bottombar from '../../components/bottombar/Bottombar';
import firebaseAuth from '../../components/firebaseauth';
import ProfileBottom from '../profile/profilebottom/ProfileBottom';
import prodConfig from '../../config/production-config';


function Search() {
  const searchBarRef = useRef(null);
  const queryLabelRef = useRef(null);
  const dropDownMenuRef = useRef(null);
  const [currLabelVal, setCurrLabelVal] = useState("User");
  const [qBtnVisibility, setQBtnVisibility] = useState(false);
  const [listOfData, setListOfData] = useState([]);
  const [listOfPostData, setListOfPostData] = useState([]);
  const [labelIsUser, setLabelIsUser] = useState(true);
  const [listOfFriends, setListOfFriends] = useState([]);
  const [searchClickedOnce, setSearchClickedOnce] = useState(false);

  const navigate = useNavigate();
  
  // returns a list of users/posts from the given parameters
  const searchUserOrPost = async (e) => {
    e.preventDefault();
    setSearchClickedOnce(true);

    if (currLabelVal === "User"){
      // Step one - send request
      axios.get(`${prodConfig}/findusers`, {
        params: {
          requser: localStorage.getItem("Username"),
          username: searchBarRef.current.value,
          queryItem: currLabelVal
        },
      })
      // Step two - parse request
      .then(function (response) {
        setListOfData(response.data[1]);
        if (currLabelVal === "User"){
          setLabelIsUser(true);
        }
        else {
          setLabelIsUser(false);
        }
        
        // Get a list of friends
        setListOfFriends(response.data[0]);
        // Check to see if any of the users in the search are friends with each other
        // If they are, pass that fact to the profileTop component and then have it render "Add friend" or "Friend" based on what was passed
      })
      .catch(function (error) {
        console.error(error);
      })
    }
    else if(currLabelVal === "Post"){
      axios.get(`${prodConfig}/findposts`, {
        params: {
          keyword: searchBarRef.current.value,
        }
      })
      .then((response) => {
        const queryOfPosts = response.data;
        setLabelIsUser(false);
        const imageObjects = queryOfPosts.map((imageData) => {
          const data = imageData.user;
          const iDataURL = imageData.url;
          return {
            id: data._id,
            postid: imageData._id,
            username: data.username,
            description: imageData.description,
            postImage: iDataURL,
            avatarImage: data.avatarURL,
            numlikes: imageData.usersWhoLiked.length,
          }
        })
        setListOfPostData(imageObjects);
      })
      .catch((error) => {
        console.error(error);
      })
    }
    else {
      console.error("Currlabel is not user or post")
    }
  }

  // label clicked
  const queryLabelClicked = () => {
    if (qBtnVisibility) {
      dropDownMenuRef.current.style.visibility = "hidden";
      setQBtnVisibility(false);
    }
    else {
      dropDownMenuRef.current.style.visibility = "visible";
      setQBtnVisibility(true);
    }
  }

  // label options clicked
  const labelOptionsClicked = (value) => {
    setCurrLabelVal(value);
    queryLabelClicked();
  }

  // user clicked -> go to their profile
  const userclicked = (username) => {
    let userroute;
    if(listOfFriends.includes(username)){
      userroute = '/profile/' + username + '/y';
    }
    else {
      userroute = '/profile/' + username + "/n";
    }
    navigate(userroute);
    return(<></>);
  }

  return (
  <div className="App">
    <div className="Body">
      <div className="sidebar">
        <Sidebar currActive="Search"/>
      </div>
      <div className="searchbar">
        <div className="Searchbar">
          <div className="search-container">
          <form onSubmit={searchUserOrPost}>
            <div className="dropdown">
              <label className="dropDownMenu" ref={queryLabelRef} onClick={queryLabelClicked}>{currLabelVal}</label>
              <div className="dropDownContent" ref={dropDownMenuRef}>
                <ul>
                  <li onClick={() => labelOptionsClicked("User")}>
                    <p>User</p>
                  </li>
                  <li onClick={() => labelOptionsClicked("Post")}>
                    <p>Post</p>
                  </li>
                </ul>
              </div>
            </div>
            <input type="text" id="topSearchBar" placeholder={currLabelVal === "User" ? "Search for users by their username" : "Search using keywords. Ex: \"cars\""} ref={searchBarRef}/>
            <button type="submit">Search</button>
          </form>
          </div>
        </div>
      </div>
      <div className="searchResults">
        { labelIsUser ?
          (
            listOfData.length !== 0 ?
            (
              <Searchresults data={listOfData.map((data) => {
                if(data.username === localStorage.getItem("Username")){
                  return null;
                }
                return(<div className="searchUser" key={data._id} onClick={() => userclicked(data.username)}>
                  {listOfFriends.includes(data.username) 
                    ? <h4 className="usernameh4"style={{color: 'purple'}}>{data.username}</h4>
                    : <h4 className="usernameh4">{data.username}</h4>
                  }
                </div>
                );
              })} searchClicked={searchClickedOnce}/>
            )
            : <h1>No search results</h1>
          )
          :(
            listOfPostData.length !== 0 ?
            (<ProfileBottom posts={listOfPostData} userInfo="whatever" friendList={listOfFriends}/>)
            : <h1>No search results</h1>
          )
        }

      </div>
      <div className="bottombar">
        <Bottombar currActive="Search"/>
      </div>
    </div>
  </div>
  );
}

export default firebaseAuth(Search);