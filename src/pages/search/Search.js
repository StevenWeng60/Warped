import './Search.css'
import Sidebar from '../../components/sidebar/Sidebar.js';
import Searchresults from './searchresults/Searchresults.js';
import { useRef, useState } from 'react'
import axios from 'axios'

function Search() {
  const searchBarRef = useRef(null);
  const queryLabelRef = useRef(null);
  const dropDownMenuRef = useRef(null);
  const [currLabelVal, setCurrLabelVal] = useState("User");
  const [qBtnVisibility, setQBtnVisibility] = useState(false);
  const [listOfData, setListOfData] = useState([]);
  const [labelIsUser, setLabelIsUser] = useState(true);
  
  const searchUser = async (e) => {
    e.preventDefault();

    // Step one - send request
    axios.get("http://localhost:3001/findusers", {
      params: {
        username: searchBarRef.current.value,
        queryItem: currLabelVal
      },
    })
    // Step two - parse request
    .then(function (response) {
      setListOfData(response.data);
      console.log(listOfData[0].username);
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
      // Step three - load page with props
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

  return (
  <div className="App">
    <div className="Body">
      <div className="sidebar">
        <Sidebar/>
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
            return(<div className="searchUser" key={data._id}>
              <h1>{data.username}</h1>
            </div>);
          })}/>
          :
          <Searchresults data = {listOfData.map((data) => {
            return (
              <h1>posts</h1>
            )
          })}/>
        }

      </div>
    </div>
  </div>
  );
}

export default Search;