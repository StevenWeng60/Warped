import './Search.css'
import Sidebar from '../../components/sidebar/Sidebar.js';
import Searchresults from './searchresults/Searchresults.js';
import { useRef, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import withAuth from '../../components/authenticate';
import Bottombar from '../../components/bottombar/Bottombar';
import firebaseAuth from '../../components/firebaseauth';




function Search() {
  const searchBarRef = useRef(null);
  const queryLabelRef = useRef(null);
  const dropDownMenuRef = useRef(null);
  const [currLabelVal, setCurrLabelVal] = useState("User");
  const [qBtnVisibility, setQBtnVisibility] = useState(false);
  const [listOfData, setListOfData] = useState([]);
  const [labelIsUser, setLabelIsUser] = useState(true);
  const [listOfFriends, setListOfFriends] = useState([]);
  const [searchClickedOnce, setSearchClickedOnce] = useState(false);
  console.log(searchClickedOnce)

  const navigate = useNavigate();
  
  // returns a list of users/posts from the given parameters
  const searchUser = async (e) => {
    e.preventDefault();
    setSearchClickedOnce(true);

    // Step one - send request
    axios.get("http://localhost:3001/findusers", {
      params: {
        requser: localStorage.getItem("Username"),
        username: searchBarRef.current.value,
        queryItem: currLabelVal
      },
    })
    // Step two - parse request
    .then(function (response) {
      setListOfData(response.data[1]);
      console.log(`response: ${response.data[1]}`);
      // const listOfUsers = response.data.map((user) => {
      //   return(<div className="searchUser" key={user._id}>
      //     <h1>{user.username}</h1>
      //   </div>);
      // })
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
      console.log(error);
    })

    // Step four - display users nicely

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
          <form onSubmit={searchUser}>
            <div className="dropdown">
              <label className="dropDownMenu" ref={queryLabelRef} onClick={queryLabelClicked}>{currLabelVal}</label>
              <div className="dropDownContent" ref={dropDownMenuRef}>
                <ul>
                  <li onClick={() => labelOptionsClicked("User")}>
                    <h4>User</h4>
                  </li>
                  <li onClick={() => labelOptionsClicked("Post")}>
                    <h4>Post</h4> 
                  </li>
                </ul>
              </div>
            </div>
            <input type="text" id="topSearchBar" placeholder="Search..." ref={searchBarRef}/>
            <button type="submit">Search</button>
          </form>
          </div>
        </div>
      </div>
      <div className="searchResults">
        { labelIsUser ?
          <Searchresults data={listOfData.map((data) => {
            if(data.username === localStorage.getItem("Username")){
              return null;
            }
            return(<div className="searchUser" key={data._id} onClick={() => userclicked(data.username)}>
              {listOfFriends.includes(data.username) 
                ? <h4 className="usernameh4"style={{color: '#6D5D6E'}}>{data.username}</h4>
                : <h4 className="usernameh4">{data.username}</h4>
              }
            </div>
            );
          })} searchClicked={searchClickedOnce}/>
          :
          <Searchresults data={listOfData.map((data) => {
            return (
              <h1>posts</h1>
            )
          })} searchClicked={searchClickedOnce}/>
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