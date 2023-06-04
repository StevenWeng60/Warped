import './ProfileTop.css'
import { people } from '../../../utilities/data.js'
import { getImageUrl } from '../../../utilities/utils.js'
import { useRef, useState, useEffect } from 'react'
import { Buffer } from 'buffer'
import axios from 'axios'

function ProfileTop({userInfo}) {

  console.log(localStorage.getItem("Username"));
  console.log(userInfo.username);
  console.log(userInfo.areFriends)
  console.log(`are friends: ${userInfo.areFriends}`);
  const [isFriend, setIsFriend] = useState(userInfo.areFriends == 'y');
  
  // Check to see if areFriends is y
  // This is because initalizing using an expression isn't working?

  const inputFileRef = useRef(null);

  const [postData, setPostData] = useState(userInfo.avatarData);
  // console.log(`avatarData: ${userInfo.avatarData}`)
  // console.log(`avatarData: ${postData}`);

  useEffect(() => {
    setPostData(userInfo.avatarData);
  }, [userInfo.avatarData])

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('avatar', file);
    axios.post("http://localhost:3001/upload/pfp",formData,{
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      params: {
        username: localStorage.getItem("Username")
      }
    }).then(function (response){
      console.log(response);
      console.log("hooray");
      grabImageFromMongoDB();
    }).catch(function (error){
      console.log(error);
    })
    console.log("complete1");
    console.log("nice going");
  }

  const handleImageClick = () => {
    inputFileRef.current.click();
  }

  const chemists = people.filter(person =>
    person.profession === 'chemist'
  );

  const grabImageFromMongoDB = async () => {
    axios.get("http://localhost:3001/postmongodb",
    {
      params: {
        username: localStorage.getItem("Username")
      },
      responseType: 'arraybuffer'
    })
    .then(function (response){
      const dataUrl = `data:${response.headers['content-type']};base64,${Buffer.from(response.data, 'binary').toString('base64')}`;
      console.log(response);

      setPostData(dataUrl);

      // Append the <img> element to the document body or any desired container
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  // Add a friend 

  const handleAddFriend = async () => {
    const requestBody = {
      username1: localStorage.getItem("Username"),
      username2: userInfo.username 
    }
    axios.post("http://localhost:3001/addfriend", requestBody)
    .then((response) => {
      setIsFriend(true);
      console.log("route works!");

    })
    .catch((error) => {
      console.log(error);
    })
  }

  console.log(isFriend);

  return (
    <>
      <div className="profiletop">
        <div className="pfp">
          <form encType="multipart/form-data" method="post">
            <div className="form-group">
                { userInfo.areFriends === 'me'
                  ? <img
                    src={postData} onClick={handleImageClick} className="avatar"/>
                  : <img
                    src={postData} className="avatar"/>
                }
              <input className="imageInput" type="file"  name="uploaded_file" style ={{display: "none"}} ref={inputFileRef} onChange={handleFileUpload}/> 
            </div>
          </form>
        </div>
        <div className="pfdescription">
          <div className="pfdescriptionflex">
            <div className="name">
              <h1 style={{color: '#F4EEE0'}}>{userInfo.username}</h1>
                { localStorage.getItem("Username") === userInfo.username 
                ? <h3 className="editprofile">Edit</h3>
                : isFriend 
                  ? <h3 className="friends">friends</h3>
                  : <h3 className="addfriend" onClick={handleAddFriend}>Add friend</h3>
                }
            </div>
            <div className="followerstats">
              <div className="followerstats2">
                <div className="stats">
                  <h4>{userInfo.numPosts} posts</h4>
                  <h4>{userInfo.numFriends} followers</h4>
                  <h4>{userInfo.numFriends} following</h4>
                </div>
              </div>
            </div>
            <div className="bio">
              <p>{userInfo.profileDescription}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileTop;